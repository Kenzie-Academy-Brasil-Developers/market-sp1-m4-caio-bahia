import express, { Application } from "express"
import logics from "./logics"
import middlewares from "./middlewares"

const app: Application = express()
app.use(express.json())

app.post("/products", logics.createProducts)
app.get("/products", logics.getAllProducts)

app.use("/products/:productId", middlewares.verifyIfIdExists)

app.get("/products/:productId", logics.getProductById)

const PORT: number = 3000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
