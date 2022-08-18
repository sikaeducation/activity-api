import express from "express"
import cors from "cors"

const app = express()
app.use(cors())

app.get("/", (request, response) => {
  response.json({
    description: "Sika's API for activities (articles, quizzes, lessons, etc.)"
  })
})

export default app
