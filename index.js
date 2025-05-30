import express from 'express'
import 'dotenv/config'
import {getHome, getSongs, postSong} from './src/controllers/songs.controllers.js'

const app = express()

app.use(express.json())

const PORT = process.env.PORT ?? 3000

app.listen(PORT, console.log(`🔥 Server: http://localhost:${PORT}`))

app.get('/', getHome)

app.get('/canciones', getSongs)

app.post('/canciones', postSong)
