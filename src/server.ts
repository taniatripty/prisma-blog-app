import app from "./app";
import { prisma } from "./lib/prisma";
const port=process.env.PORT

async function main(){
    try {
        await prisma.$connect();
        console.log('server is connected successfully')
        app.listen(port,()=>{
            console.log(`server is running on http://localhost:${port}`)
        })
    } catch (error) {
        console.log('error is occured',error)
        await prisma.$disconnect()
        process.exit(1)
        
    }
}

main()