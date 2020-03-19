const http = require('http');
const os = require('os');
const url = require('url');
const path = require('path');
b = require('./qasurvey-backend.js');

const port = process.argv[2] || 8080;
const expo_ip = os.networkInterfaces()
console.log('os.networkIF')
console.log(expo_ip)

http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url);
  const params = new URLSearchParams( parsedUrl.query )
  
  const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
  let pathname = path.join(__dirname, sanitizePath);

  
  if (pathname.match(/quiz/)) {
    params.set('op' , !(["Yes", "No"].includes(params.get('yn')) && params.get('id')) ? params.get('id') ? 'fetchRoom' : 'fetchRandomRoom' : params.get('op'))
    res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
    b[params.get('op')](params.get('id'), params.get('yn')).then((resp, rej) => {
      res.write(JSON.stringify(resp, 0, 4));
      res.end();
    }).catch((rej, e) => {
      res.write(JSON.stringify({"error": rej}, 0, 4));
      res.end();
    })
    
  }
  else 
  {
    res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
    res.write(JSON.stringify({'error':'noservice'}, 0, 4));
    res.end()
    
  }
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);
