'use strict'
const http = require('http')
const getIP = require('ipware')().get_ip

const server = http.createServer((req, res) => {
  if (/^\/whoami\/?$/.test(req.url)) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    try {
      res.end(JSON.stringify({
        ipaddress: getIP(req).clientIp,
        language: req.headers['accept-language'].split(',')[0],
        software: req.headers['user-agent'].match(/\((.*?)\)/)[1]
      }))
    }
    catch (e) {
      res.writeHead(500)
      console.error(e)
    }

  } else {
    res.writeHead(404)
    res.end()
  }
})

const port = process.env.PORT || 3000
server.listen(port)