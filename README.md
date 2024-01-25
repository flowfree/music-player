NCS Downloader & Player
=======================
Download [NCS](https://ncs.io) musics and play the tracks right from your browser.


## Installation
After cloning this repo, follow these steps:

1.  Install the required packages:

        npm install

1.  Run database migrations:

        npx prisma migrate dev

    This command will create the SQLite database and apply the DB migrations. Note that the command being used is `npx` instead of `npm`.

1.  Download the latest NCS tracks:

        npm run ncsTracks

1.  Run the dev server:

        npm run dev

    Visit http://localhost:3000 using your browser to open the app.


## License 
MIT
