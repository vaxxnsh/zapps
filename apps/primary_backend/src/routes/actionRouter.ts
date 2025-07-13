import { Router } from "express";
import { prisma } from "@repo/database";
import { StatusCodes } from "http-status-codes";


const actionRouter = Router()

actionRouter.get("/available",async (req,res) => {
    
    try {
        const availableActions = await prisma.typeAction.findMany({});
        res.status(StatusCodes.OK).json({
            availableActions : availableActions
        })
    }
    catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error : err
        })
    }
})