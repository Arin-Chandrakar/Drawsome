import express from 'express';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types"
import {prisma} from "@repo/db"

const app= express();
app.use(express.json());

app.post("/signup",(req,res)=>{

    const parsedData=CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }
    

    try{
        const user=prisma.user.create({
        data:{
            email:parsedData.data?.username,
            password:parsedData.data.password,
            name:parsedData.data.name
        }
    })
    //db call
    res.json({
        userId:"123"
    })
    }catch(e){
        res.status(411).json({
            message:"User already exists with this username"
        })
    }
});

app.post("/signin", async (req,res)=>{
    
    const parsedData=SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }

    const user = await prisma.user.findFirst({
        where:{
            email:parsedData.data.username,
            password:parsedData.data.password
        }
    })

    if(!user){
        res.status(403).json({
            message:"Not authorized"
        })
        return;
    }

    const token = jwt.sign({
        userId:user?.id
    },JWT_SECRET);

    res.json({
        token
    })
});

app.post("/room",middleware,async(req,res)=>{

    const parsedData=CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }

    //@ts-ignore
    const userId=req.userId;

    await prisma.room.create({
        data:{
            slug:parsedData.data.name,
            adminId:userId
        }
    })
    res.json({
        roomId:123
    })

});

app.listen(3003);