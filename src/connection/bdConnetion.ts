import mongoose from "mongoose"


const url = process.env.DB_URL
export const connectionDB = async () =>{
    try {
        await mongoose.connect(`${url}`)
        console.log('DataBase Connected')
    } catch (error) {
        console.log('database not connected')
    }
}