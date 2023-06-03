import express, { Application } from "express"
import logics from "./logics"
import middlewares from "./middlewares"

const app: Application = express()
app.use(express.json())

app.post("/products", middlewares.verifyIfNameExists, logics.createProducts)
app.get("/products", logics.getAllProducts)

app.use("/products/:productId", middlewares.verifyIfIdExists)

app.get("/products/:productId", logics.getProductById)
app.patch("/products/:productId", middlewares.verifyIfNameExists, logics.updateProduct)
app.delete("/products/:productId", logics.deleteProduct)

const PORT: number = 3000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
