import express from "express";
import bodyParser from "body-parser";
import connectToDB from "./db/connect.js";
import authRouter from "./routes/auth.js"
import jobsRouter from "./routes/jobs.js";
import verifyUser from "./middleware/authentication.js";
import "dotenv/config";
const app = express();

const PORT= 5000;

app.use(bodyParser.json());

app.use('/api/v1/auth',authRouter);

app.use('/api/v1/jobs',verifyUser,jobsRouter);

//connect to the database and start the app on the port
connectToDB(process.env.DB_CONNECTION_URL);
app.listen(PORT,() => {
    console.log(`server listening on port ${PORT}`)

})