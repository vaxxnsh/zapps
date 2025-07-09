import express from "express"
import { prisma } from "./db";


const app = express()

app.post("/hooks/catch/:userId/:zapId",(req,res) => {
    const userId = req.params.userId
    const zapId = req.params.zapId

    // storing a trigger in db
    prisma
    
    // pushing it to a queue

})