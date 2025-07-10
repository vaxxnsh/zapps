import { Router } from "express";
import { authMiddleware } from "src/middleware";

const zapRouter = Router();

zapRouter.post("/",authMiddleware,(req,res) => {
    res.send("dummy post zap")
});

zapRouter.get("/",authMiddleware,(req,res) => {
    res.send("dummy get zap")
});

zapRouter.post("/:zapId",authMiddleware,(req,res) => {
    res.send("dummy about zap")
});

export default zapRouter;