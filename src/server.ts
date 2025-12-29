import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import 'dotenv/config'
import cors from 'cors'
import { env } from './env'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message,
    })
  }

  return res.status(500).json({
    error: 'Internal server error',
  })
})

app.listen(env.PORT, () => {
  console.log(`Server is running on port http://localhost:${env.PORT}`)
})
