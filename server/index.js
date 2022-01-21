import express from 'express';
import {graphqlHTTP} from "express-graphql";
import {schema} from "./schema/graphSchema.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()
const app = express()
const PORT =process.env.PORT || 4000

app.use(cors())

//Establish mongo connection with an external link
mongoose.connect(process.env.URI,()=>{
    console.log("we are connecting to the database....")
})

//we use the schema here , we can just put schema but we follow the procedure
app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}))
app.listen(PORT,()=>console.log("open in port "+PORT))
