#### Info
This is an Api processing image engine that can process an image and resize it using the link : http://localhost:3000/

### Port
The server will listen on port :3000

### Scripts used
- Install: ```npm install```
- Build: ```npm run build```
- Start server: ```npm run start```
- Run unit tests: ```npm run test```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```

#### Endpoint to images
http://localhost:3000/api/images

Expected arguments:
- _filename_: Available filenames are:
  - icelandwaterfall
  - palmtunnel
  - santamonica
  - encenadaport
  - fjord
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0
