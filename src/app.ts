import express, { Application } from "express"
import logics from "./logics"

const app: Application = express()
app.use(express.json())

app.post("/products", logics.create)
app.get("/products", logics.read)

const PORT: number = 3000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
