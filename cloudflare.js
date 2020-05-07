const axios = require('axios')

const client = axios.create({
  baseURL: 'https://api.cloudflare.com/client/v4',
  headers: {
    'X-Auth-Key': process.env.CLOUDFLARE_ACCESS_TOKEN,
    'X-Auth-Email': process.env.CLOUDFLARE_EMAIL,
    'Content-Type': 'application/json'
  }
})

module.exports = client