import express from "express"
import 'dotenv/config'
import cors from "cors"
import { router } from "./routes"
import { env } from "./env"

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)


app.listen(env.PORT, () => {
  console.log(`Server is running on port http://localhost:${env.PORT}`)
})
