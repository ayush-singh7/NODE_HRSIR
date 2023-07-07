import { log } from "console";
import express from "express";
const app = express();
import { connect } from "./db/database";
import UserModel from "./db/models/user";
import { Login, Register } from "./controllers/onboarding";
import { Delete, Update, View, ViewOne } from "./controllers/features";


app.use(express.json())

app.post("/register", Register);

app.post("/login", Login);

app.get("/users",View);

app.get("/users/:id",ViewOne);

app.delete("/users/:id",Delete);

app.patch("/users/:id",Update)


app.listen(4000,()=>{
    connect();
    console.log("LISTENING ON 4000");

})