import express from 'express'
import router from './routes'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)
app.use((req, res)=>{
   res.status(400).json({error: 'Ruta no encontrada'})
})

const PORT = process.env.PORT || 3020
app.listen(PORT,() =>{
    console.log('Servidor Corriendo🚀:', PORT)
})