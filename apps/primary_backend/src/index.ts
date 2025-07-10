import express from 'express'
import userRouter from './routes/userRouter';
import zapRouter from './routes/zapRouter';
import cors from 'cors'

const PORT = 8000;
const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1/user",userRouter);
app.use("/api/v1/zap",zapRouter);

app.listen(PORT,() => {
    console.log("Server started at : ",PORT)
})
