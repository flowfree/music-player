import fs from 'fs'
import axios from 'axios'
import * as cheerio from 'cheerio'
import * as mm from 'music-metadata'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Track {
  title: string
  artists: string[]
  genres: string[]
  releaseDate?: Date
  url: string
  audioUrl: string
  imageUrl?: string
}

async function fetchNCSTracks() {
  const response = await axios.get('https://ncs.io/music')
  const $ = cheerio.load(response.data)

  const tracks: Track[] = []

  $('.module.artists .row .item').each((index, track) => {
    const url = 'https://ncs.io' + $(track).find('a').attr('href')
    const title = $(track).find('.bottom strong').text()
    const artists = $(track).find('.bottom .tags').text().split(', ')
    const genres = $(track).find('.options strong').text().split(', ')
    const date = $(track).find('.options [title]').attr('title') 
    const audioUrl = $(track).find('.btn.player-play').attr('data-url') || ''

    let imageUrl = undefined
    const styleAttr = $(track).find('.img').attr('style')
    if (styleAttr) {
      const urlMatch = styleAttr.match(/url\('(.+)'\)/)
      if (urlMatch) {
        imageUrl = urlMatch[1]
      }
    }

    tracks.push({
      title,
      artists,
      genres,
      url,
      imageUrl,
      audioUrl,
      releaseDate: date ? new Date(date) : undefined
    })
  })

  return tracks
}

async function downloadMP3(url: string, filePath: string): Promise<void> {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    onDownloadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        const progressBarLength = 25
        const completedChars = Math.floor(progress * progressBarLength / 100)
        const remainingChars = progressBarLength - completedChars;
        const progressBar = '#'.repeat(completedChars) + ' '.repeat(remainingChars);
        
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        process.stdout.write(`Downloading MP3: [${progressBar}] ${progress}%`)
      }
    }
  })

  const buffer = Buffer.from(response.data, 'binary')
  fs.writeFileSync(filePath, buffer)
  
  process.stdout.write('\n')
}

async function getMP3Duration(filePath: string): Promise<number> {
  const metadata = await mm.parseFile(filePath);
  if (metadata && metadata.format && metadata.format.duration) {
    return Math.floor(metadata.format.duration)
  } else {
    return 0
  }
}

async function main() {
  const tracks = await fetchNCSTracks()

  for (let track of tracks) {
    const { title, url, imageUrl, releaseDate } = track

    const exist = await prisma.track.findFirst({ where: { url } })
    if (exist) {
      break
    }

    const createdTrack = await prisma.track.create({
      data: { title, url, imageUrl, releaseDate }
    })

    for (const name of track.genres) {
      let genre = await prisma.genre.findFirst({ where: { name } })
      if (!genre) {
        genre = await prisma.genre.create({ data: { name } })
      }
      await prisma.trackGenre.create({
        data: { 
          trackId: createdTrack.id,
          genreId: genre.id
        }
      })
    }

    for (const name of track.artists) {
      let artist = await prisma.artist.findFirst({ where: { name } })
      if (!artist) {
        artist = await prisma.artist.create({ data: { name } })
      }
      await prisma.trackArtist.create({
        data: {  
          trackId: createdTrack.id,
          artistId: artist.id
        }
      })
    }

    console.log(`${track.title} - ${track.artists}`)
    const filePath = `./public/audio/${createdTrack.id}.mp3`
    await downloadMP3(track.audioUrl, filePath)

    const duration = await getMP3Duration(filePath)
    await prisma.track.update({
      where: { id: createdTrack.id },
      data: { duration }
    })
  }
}

try {
  main()
} catch (err) {
  console.error(err)
}
