import fs from 'fs'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Track {
  title: string
  artists: string[]
  genres: string[]
  date?: string
  url: string
  audioUrl: string
  imageUrl?: string
}

async function fetchNCSTracks() {
  // const response = await axios.get('https://ncs.io/music')
  // const $ = cheerio.load(response.data)

  const filePath = './sample-data/ncs.html'
  const content = fs.readFileSync(filePath, 'utf-8')
  const $ = cheerio.load(content)

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
      date,
      url,
      imageUrl,
      audioUrl
    })
  })

  return tracks
}

async function main() {
  const tracks = await fetchNCSTracks()

  for (let track of tracks) {
    const { title, url, imageUrl } = track

    const exist = await prisma.track.findFirst({ where: { url } })
    if (exist) {
      break
    }

    const createdTrack = await prisma.track.create({
      data: { title, url, imageUrl }
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
  }
}

try {
  main()
} catch (err) {
  console.error(err)
}
