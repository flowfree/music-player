import fs from 'fs'
import axios from 'axios'
import * as cheerio from 'cheerio'

async function main() {
  // const response = await axios.get('https://ncs.io/music')
  // const $ = cheerio.load(response.data)

  const filePath = './sample-data/ncs.html'
  const content = fs.readFileSync(filePath, 'utf-8')
  const $ = cheerio.load(content)

  $('.module.artists .row .item').each((index, track) => {
    const url = 'https://ncs.io' + $(track).find('a').attr('href')
    const title = $(track).find('.bottom strong').text()
    const tags = $(track).find('.bottom .tags').text()
    const date = $(track).find('.options [title]').attr('title')
    const genres = $(track).find('.options strong').text()

    let imageUrl = null
    const styleAttr = $(track).find('.img').attr('style')
    if (styleAttr) {
      const urlMatch = styleAttr.match(/url\('(.+)'\)/)
      if (urlMatch) {
        imageUrl = urlMatch[1]
      }
    }

    const audioUrl = $(track).find('.btn.player-play').attr('data-url')
    console.log(audioUrl)
  })
}

try {
  main()
} catch (err) {
  console.error(err)
}
