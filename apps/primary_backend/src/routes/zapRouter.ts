import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateBody } from "src/validations/zapSchema";
import { StatusCodes } from "http-status-codes";
import { includes } from "zod";

const zapRouter = Router();

zapRouter.post("/",authMiddleware,async (req,res) => {
    const zapPostBody = ZapCreateBody.safeParse(req.body);

   if (!zapPostBody.success) {
           res.status(StatusCodes.BAD_REQUEST).json({
               error : "Invalid Inputs",
               all_errors : zapPostBody.error
           })
           return
    }

    const zap = await prisma.zap.create({
        data : {
            userId : req.id as number,
            trigger : {
                create : {
                    type_Id : zapPostBody.data.typeTriggerId, 
                }
            },

           actions : {
                create : zapPostBody.data.actions.map((action,index) => ({
                    type_id : action.typeActionId,
                    sortingOrder : index
                }))
           }
        }
    })
});

zapRouter.get("/",authMiddleware,async (req,res) => {
    const userId = req.id as number;

    const zaps = await prisma.zap.findMany({
        where : {
            userId : userId,
        },

        include : {
            actions : {
                include : {
                    type : true,
                
                }
            },

            trigger : {
                include : {
                    type : true,
                }
            }
        }
    })

    res.status(StatusCodes.OK).json({
        zaps : zaps,
    })
});

zapRouter.post("/:zapId",authMiddleware,async (req,res) => {
    const userId = req.id as number;
    const zapId = req.params.zapId;

    const zap = await prisma.zap.findFirst({
        where : {
            id : zapId,
            userId : userId
        },

        include : {
            actions : {
                include : {
                    type : true,
                
                }
            },

            trigger : {
                include : {
                    type : true,
                }
            }
        }
    })

    if (!zap) {
        res.status(StatusCodes.NOT_FOUND).json({
            error : "No zap found with that zapId"
        })
        return;
    }

    res.status(StatusCodes.OK).json({
        zap : zap,
    })
});

export default zapRouter;