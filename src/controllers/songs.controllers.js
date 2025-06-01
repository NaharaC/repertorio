import path from 'path'
import fs from 'fs'
import crypto from 'crypto'

const REPERTORIO_PATH = path.resolve('repertorio.json')

const getHome = (req, res) => {
  res.sendFile(path.resolve('index.html'))
}

const getSongs = (req, res) => {
  try {
    const songs = JSON.parse(fs.readFileSync(REPERTORIO_PATH, 'utf8'))
    res.json(songs)
  } catch {
    res.status(500).json({ message: 'No se pudieron obtener las canciones' })
  }
}

const postSong = (req, res) => {
  try {
    const { titulo, artista, tono } = req.body
    const id = crypto.randomUUID()

    const song = {
      id,
      titulo,
      artista,
      tono
    }

    const songs = JSON.parse(fs.readFileSync(REPERTORIO_PATH, 'utf8'))
    songs.push(song)
    fs.writeFileSync(REPERTORIO_PATH, JSON.stringify(songs, null, 2))
    res.status(201).json({ message: 'Canción agregada correctamente', song })
  } catch (error) {
    res.json({ message: 'El recurso no está disponible' })
  }
}

const putSong = (req, res) => {
  try {
    const { id } = req.params
    const { titulo, artista, tono } = req.body
    const songs = JSON.parse(fs.readFileSync(REPERTORIO_PATH, 'utf8'))
    const i = songs.findIndex(song => song.id === id)
    songs[i] = { id, titulo, artista, tono }
    fs.writeFileSync(REPERTORIO_PATH, JSON.stringify(songs, null, 2))
    res.status(201).json({ message: 'Canción actualizada correctamente' })
  } catch (error) {
    res.json({ message: 'El recurso no está disponible' })
  }
}

const deleteSong = (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const songs = JSON.parse(fs.readFileSync(REPERTORIO_PATH, 'utf8'))
    const newSongs = songs.filter(song => song.id !== id)
    fs.writeFileSync(REPERTORIO_PATH, JSON.stringify(newSongs, null, 2))
    res.status(201).json({ message: 'Canción eliminada correctamente' })
  } catch (error) {
    res.json({ message: 'El recurso no está disponible' })
  }
}

export { getHome, getSongs, postSong, putSong, deleteSong }
