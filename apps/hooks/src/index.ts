import express from "express"
import 'dotenv/config'
import { prisma } from "@repo/database";

const PORT = 3000;
const app = express();
app.use(express.json());


app.post("/hooks/catch/:userId/:zapId",async (req,res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const metaData = req.body

    console.log("zapId : ",zapId)
    console.log("metaData : ",metaData)

    // storing a trigger in db
    try {
            await prisma.$transaction(async (tx) => {
                const zapRun = await tx.zapRun.create({
                    data : {
                        zap_id : zapId,
                        metadata : metaData
                    }
                })

                const zapRunoutBox = await tx.zapRunOutbox.create({
                    data : {
                        zapRun_id : zapRun.id
                    }
                })
            }) 

            res.status(200).json({
                success : true
            })
    }
    catch(err) {
        res.status(500).json({
            error : err
        })
        console.log("Error is : ",err)
    }
})

app.listen(PORT,() => {
    console.log("Server started on Port: "+PORT)
})