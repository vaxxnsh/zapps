import { prisma } from "@repo/database";
import {Kafka} from 'kafkajs'
import {setTimeout} from 'timers/promises'
const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
    clientId : "outbox-proccessor",
    brokers:["localhost:9092"]
})

async function main() {
    const producers = kafka.producer();
    await producers.connect();

   while(1) {
        try{
            const zapOutBoxes = await prisma.zapRunOutbox.findMany({
                take  : 10,
            })
            console.log("outBoxes are : ",zapOutBoxes)

            if (zapOutBoxes.length == 0) {
                console.log("No outBoxes found will look again in 1 minute");
                await setTimeout(60000);
                continue
            }

            producers.send({
                topic : TOPIC_NAME,
                messages : zapOutBoxes.map(outbox => ({value : outbox.zapRun_id}))
            })

            await prisma.zapRunOutbox.deleteMany({
                where : {
                    id : {
                        in : zapOutBoxes.map(outBox => outBox.id)
                    }
                }
            })
        }
        catch(err) {
            console.log(err)
        }
   }
}

main()