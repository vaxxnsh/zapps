import { Router } from "express";
import { prisma } from "@repo/database";
import { StatusCodes } from "http-status-codes";


const triggerRouter = Router()

triggerRouter.get("/available",async (req,res) => {
    
    try {
        const availableTriggeres = await prisma.typeTrigger.findMany({});
        res.status(StatusCodes.OK).json({
            availableTriggers : availableTriggeres
        })
    }
    catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            err : err
        })
    }
})