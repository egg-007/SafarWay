import app from "./app.js"

const  PORT  = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Welcome the channel radio show TV in ${PORT}!`)
})