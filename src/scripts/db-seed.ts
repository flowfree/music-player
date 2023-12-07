import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const genres = [
  { id: 1, name: 'Electronic' },
  { id: 2, name: 'Drum & Bass' },
  { id: 3, name: 'House' },
  { id: 4, name: 'EDM' },
  { id: 5, name: 'Pop' },
]

const artists = [
  { id: 1, name: 'Raul Ojamaa' },
  { id: 2, name: 'Maris Pihlap' },
  { id: 3, name: 'Shiah Maisel' },
  { id: 4, name: 'Clarx' },
  { id: 5, name: 'Wiguez' },
  { id: 6, name: 'P-One' },
  { id: 7, name: 'MANIA' },
  { id: 8, name: 'yanvince' },
]

const tracks = [{
  id: 1,
  title: 'Hold On Me',
  artists: [1,2],
  genres: [1],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/ccfbde2c-c65c-4b21-9ec2-59fc4e0ee35a/artwork-440x440.jpg',
}, {
  id: 2,
  title: 'Give Up',
  artists: [3,4],
  genres: [1],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/1f74929b-9acf-4466-8d64-e4ef282e8602/artwork-440x440.jpg'
}, {
  id: 3,
  title: 'VBM (Ft. P-One)',
  artists: [5,6],
  genres: [2],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/5b4d8c50-649f-4ffb-a322-9046b6867dbd/artwork-440x440.jpg'
}, {
  id: 4,
  title: 'Time Of Our Lives',
  artists: [7],
  genres: [2],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/cafb6592-fd16-4517-885c-eec8666a35b3/artwork-440x440.jpg'
}, {
  id: 5,
  title: 'las fallas',
  artists: [8],
  genres: [3],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/92464bd1-4cac-4d45-a641-1fe12330b1be/artwork-440x440.jpg'
}]

async function dbSeed() {
  await prisma.genre.deleteMany()
  await prisma.artist.deleteMany()
  await prisma.track.deleteMany()

  for (const data of genres) {
    const genre = await prisma.genre.create({ data })
    console.log(`Genre: ${genre.name}`)
  }

  for (const data of artists) {
    const artist = await prisma.artist.create({ data })
    console.log(`Artist: ${artist.name}`)
  }

  for (const track of tracks) {
    const { id, title, imageUrl } = track

    const createdTrack = await prisma.track.create({
      data: { id, title, imageUrl }
    })

    for (const artistId of track.artists) {
      await prisma.trackArtist.create({
        data: {  
          trackId: createdTrack.id,
          artistId
        }
      })
    }

    for (const genreId of track.genres) {
      await prisma.trackGenre.create({
        data: { 
          trackId: createdTrack.id,
          genreId
        }
      })
    }

    console.log(`Track: ${createdTrack.title}`)
  }
}

try {
  dbSeed()
} catch (err) {
  console.error(err)
} finally {
  prisma.$disconnect()
}
