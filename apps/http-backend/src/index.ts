import express from 'express';
import "dotenv/config";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types"
import {prisma} from "@repo/db/index"
import cors from "cors";


const app= express();
app.use(cors());
app.use(express.json());

app.post("/signup",async (req,res)=>{

    const parsedData=CreateUserSchema.safeParse(req.body);
    console.log(req.body)
    console.log(parsedData)
    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }
    

    try{
        const user= await prisma.user.create({
        data:{
            name:parsedData.data.name,
            username:parsedData.data.username,
            password:parsedData.data.password
        }
    })
    //db call
    res.json({
        userId: user.id
    })
    }catch(e){
        console.log(e)
        res.status(400).json({
            message:"User already exists with this username"
        })
        
    }
});

app.post("/signin", async (req,res)=>{
    
    const parsedData=SigninSchema.safeParse(req.body);

    try{
        if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }

    const user = await prisma.user.findFirst({
        where:{
            username:parsedData.data.username,
            password:parsedData.data.password
        }
    })

    const token = jwt.sign({
        userId:user?.id
    },JWT_SECRET);

    res.json({
        token
    })
    }catch(e){
        if(e){
        res.status(403).json({
            message:"Not authorized"
        })
        return;
    }
    }   
});

app.post("/room",middleware,async(req,res)=>{
    const parsedData=CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        console.log(parsedData.error)
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }

    //@ts-ignore
    const userId=req.userId;

    try{
        const room=await prisma.room.create({
        data:{
            slug:parsedData.data.slug,
            adminId:userId,
        }
    })
    res.json({
        roomId:room.id
    })
    }catch(e){
        res.status(411).json({
            message:"Room already exists with this name"
     })
    }
    

});

app.post("/chats/:roomId" ,async (req,res)=>{
    const roomId = Number(req.params.roomId);
    const messages = await prisma.chat.findMany({
        where:{
            roomId:roomId
        },
        orderBy:{
            id:"desc"
        },
        take:50
    });

    res.json({
        messages
    })
})

app.post("/room/:slug" ,async (req,res)=>{
    const slug = req.params.slug;
    const room = await prisma.room.findFirst({
        where:{
            slug
        }
    });

    res.json({
        room
    })
})

app.listen(3003);