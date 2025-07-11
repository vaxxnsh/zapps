import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { authMiddleware } from "../middleware";
import { SignInBody, SignUpBody } from "../validations/userSchema";
import { prisma } from "@repo/database";
import jwt from "jsonwebtoken";
import z, { object } from "zod";
import { getErrorStrings } from "../utils";
import { JWT_SECRET } from "../config";

const userRouter = Router();

userRouter.post("/signup", async (req,res) => {
    const signUpBody = SignUpBody.safeParse(req.body);

    if (!signUpBody.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error : "Invalid Inputs",
        })
        return
    }
    const {name,email,password} = signUpBody.data;

    try {

        const userExists = await prisma.user.findFirst({
            where : {
                email : email
            }
        });

        if (userExists) {
            res.status(StatusCodes.CONFLICT).json({
                error : "user already have an account",
            })
            return
        }

        

        const user = await prisma.user.create({
            data : {
                name : name,
                email : email,
                //TODO: Hash The Password
                password : password
            }
        })

        //TODO : SEND EMAIL TO THE USER

        res.status(StatusCodes.CREATED).json({
            message : "User created successfully",
            userId : user.id,
        })

    }
    catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error : err
        })
    }
});

userRouter.post("/signin",async (req,res) => {
    const signInBody = SignInBody.safeParse(req.body);

    if (!signInBody.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error : "Invalid Inputs",
            all_errors : signInBody.error
        })
        return
    }
    const {email,password} = signInBody.data;

    const user = await prisma.user.findFirst({
        where : {
            email : email,
        }
    });

    if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({
            error : "No user present with that email",
        })
        return
    }

    if (user.password !== password) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            error : "Incorrect email or password"
        })
        return
    }

    const token = jwt.sign({
        id : user.id
    },JWT_SECRET)

    res.status(StatusCodes.OK).send({
        token : token
    })
})

userRouter.get("/",authMiddleware,async (req,res) => {
    const id = req.id

    const user = await prisma.user.findFirst({
        where : {
            id : id,
        },

        select : {
            name : true,
            email : true,
        }
    })

    res.status(StatusCodes.OK).json({
        user
    })

})

export default userRouter;