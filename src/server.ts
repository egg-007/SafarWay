import app from "./app.js"
import Database from "./shared/database.js"
const database = new Database();
await database.connect();
const  PORT  = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Welcome the channel radio show TV in ${PORT}!`)
})