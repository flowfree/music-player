import { PlayCircleIcon } from '@heroicons/react/24/solid'

const songs = [{
  id: 1,
  title: 'Hold On Me',
  artist: 'Raul Ojamaa, Maris Pihlap',
  genres: ['Electronic'],
  image: 'https://linkstorage.linkfire.com/medialinks/images/ccfbde2c-c65c-4b21-9ec2-59fc4e0ee35a/artwork-440x440.jpg'
}, {
  id: 2,
  title: 'Give Up',
  artist: 'Clarx, Shiah Maisel',
  genres: [],
  image: 'https://linkstorage.linkfire.com/medialinks/images/1f74929b-9acf-4466-8d64-e4ef282e8602/artwork-440x440.jpg'
}, {
  id: 3,
  title: 'VBM (Ft. P-One)',
  artist: 'Wiguez, P-One',
  genres: ['Drum & Bass'],
  image: 'https://linkstorage.linkfire.com/medialinks/images/5b4d8c50-649f-4ffb-a322-9046b6867dbd/artwork-440x440.jpg'
}, {
  id: 4,
  title: 'Time Of Our Lives',
  artist: 'MANIA',
  genres: ['Drum & Bass'],
  image: 'https://linkstorage.linkfire.com/medialinks/images/cafb6592-fd16-4517-885c-eec8666a35b3/artwork-440x440.jpg'
}, {
  id: 5,
  title: 'las fallas',
  artist: 'yanvince',
  genres: ['House'],
  image: 'https://linkstorage.linkfire.com/medialinks/images/92464bd1-4cac-4d45-a641-1fe12330b1be/artwork-440x440.jpg'
}, {
  id: 6,
  title: 'Baby Sweet',
  artist: 'intouch',
  genres: ['House'],
  image: 'https://linkstorage.linkfire.com/medialinks/images/b43d86ab-4bb3-462c-af86-59edb0344db2/artwork-440x440.jpg'
}, {
  id: 7,
  title: 'Karma',
  artist: 'Alaina Cross',
  genres: ['Pop', 'Electronic'],
  image: 'https://linkstorage.linkfire.com/medialinks/images/987b297e-b3f6-4ef8-8068-5758a470d809/artwork-440x440.jpg'
}, {
  id: 8,
  title: 'Are You With Me',
  artist: 'PLVTO',
  genres: ['Electronic'],
  image: 'https://linkstorage.linkfire.com/medialinks/images/470f8b0b-6e84-4304-a93b-53fd685fd770/artwork-440x440.jpg'
}, {
  id: 9,
  title: 'RPM',
  artist: 'JOXION',
  genres: ['Future House'],
  image: 'https://linkstorage.linkfire.com/medialinks/images/82bd6340-d2f3-48b7-b964-5b14bc6dfad1/artwork-440x440.jpg'
}, {
  id: 10,
  title: 'BABY',
  artist: 'Sam Day',
  genres: ['House'],
  image: 'https://linkstorage.linkfire.com/medialinks/images/6261a0f5-93d3-4f32-a599-97f380ad58ba/artwork-440x440.jpg'
}]

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto">
      <ul className="grid grid-cols-5 gap-x-8 gap-y-10">
        {songs.map(song => (
          <li className="flex flex-col gap-2">
            <img src={song.image} className="rounded-md" alt="" />
            <div>
              <h3 className="font-bold">
                {song.title}
              </h3>
              <p className="text-sm text-gray-500">
                {song.artist}
              </p>
              <div className="mt-2 flex gap-2 items-center">
                <p className="grow text-sm font-bold text-gray-800">
                  {song.genres.join(', ')}
                </p>
                <p>
                  <button className="py-1 px-2 flex gap-1 text-xs rounded-full border border-gray-600 hover:bg-indigo-700 hover:text-white font-bold">
                    <PlayCircleIcon className="w-4 h-4" />
                    Play
                  </button>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
