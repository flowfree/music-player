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
  { id: 9, name: 'intouch' },
  { id: 10, name: 'Alaina Cross' },
  { id: 11, name: 'PLVTO' },
  { id: 12, name: 'JOXION' },
  { id: 13, name: 'Sam Day' },
]

const tracks = [{
  id: 10,
  title: 'BABY',
  artists: [13],
  genres: [3],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/6261a0f5-93d3-4f32-a599-97f380ad58ba/artwork-440x440.jpg'
}, {
  id: 9,
  title: 'RPM',
  artists: [12],
  genres: [3],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/82bd6340-d2f3-48b7-b964-5b14bc6dfad1/artwork-440x440.jpg'
}, {
  id: 8,
  title: 'Are You With Me',
  artists: [11],
  genres: [1],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/470f8b0b-6e84-4304-a93b-53fd685fd770/artwork-440x440.jpg'
}, {
  id: 7,
  title: 'Karma',
  artists: [10],
  genres: [5,1],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/987b297e-b3f6-4ef8-8068-5758a470d809/artwork-440x440.jpg'
}, {
  id: 6,
  title: 'Baby Sweet',
  artists: [9],
  genres: [3],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/b43d86ab-4bb3-462c-af86-59edb0344db2/artwork-440x440.jpg'
}, {
  id: 5,
  title: 'las fallas',
  artists: [8],
  genres: [3],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/92464bd1-4cac-4d45-a641-1fe12330b1be/artwork-440x440.jpg'
}, {
  id: 4,
  title: 'Time Of Our Lives',
  artists: [7],
  genres: [2],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/cafb6592-fd16-4517-885c-eec8666a35b3/artwork-440x440.jpg'
}, {
  id: 3,
  title: 'VBM (Ft. P-One)',
  artists: [5,6],
  genres: [2],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/5b4d8c50-649f-4ffb-a322-9046b6867dbd/artwork-440x440.jpg'
}, {
  id: 2,
  title: 'Give Up',
  artists: [3,4],
  genres: [1],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/1f74929b-9acf-4466-8d64-e4ef282e8602/artwork-440x440.jpg'
}, {
  id: 1,
  title: 'Hold On Me',
  artists: [1,2],
  genres: [1],
  imageUrl: 'https://linkstorage.linkfire.com/medialinks/images/ccfbde2c-c65c-4b21-9ec2-59fc4e0ee35a/artwork-440x440.jpg',
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
