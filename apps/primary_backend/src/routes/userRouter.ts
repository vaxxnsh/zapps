import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { authMiddleware } from "src/middleware";
import { SignInBody, SignUpBody } from "src/validations/userSchema";
import { prisma } from "@repo/database";


const userRouter = Router();

userRouter.post("/signup", async (req,res) => {
    const signUpBody = SignUpBody.safeParse(req.body);

    if (!signUpBody.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error : "Invalid Inputs",
            all_errors : signUpBody.error
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
            user : user,
        })

    }
    catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error : err
        })
    }
});

userRouter.post("/signin",(req,res) => {
    const signInBody = SignInBody.safeParse(req.body);

    if (!signInBody.success) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error : "Invalid Inputs",
            all_errors : signInBody.error
        })
        return
    }
    const {email,password} = signInBody.data;


})

userRouter.get("/",authMiddleware,(req,res) => {
    res.send("dummy signup route")
})

export default userRouter;