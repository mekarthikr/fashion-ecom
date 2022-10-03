import express, { json } from 'express';
import pkg from 'mongoose';
import userRouter from './routes/user-routes'
import productRouter from './routes/product-routes'
import cartRoutes from './routes/cart-routes'
import dotenv from 'dotenv';
import cors from 'cors'
import { Server } from 'socket.io';
import { io } from './utils/socket-connection';
const { connect } =  pkg;

// const io = new Server({
//   cors: {
//       origin: "http://localhost:3000"
//   }
// });


// import cookieParser from 'cookie-parser'
// import cors from 'cors'

dotenv.config()
const app = express();
app.use(cors())
// app.use(cookieParser())
app.use(json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

app.use('/users',userRouter)
app.use('/products', productRouter)
app.use('/cart',cartRoutes)



connect('mongodb://localhost:27017/fashion')

    .then(() => console.log("Connected to Database"))
    .then(() => {

        // app.listen(process.env.PORT);
        // console.log(`App listen to the port : ${process.env.PORT}`)

        app.listen(8000);
        console.log(`App liseten to the port : ${8000}`)

    })
    .catch(err => console.log(err))

    io.on("connection", (socket) => {
      //   console.log("connected...");
      console.log("someone has connected!")


    //  socket.emit("firstEvent", "message")
  
      socket.on("sendNotification",(message)=>{
        console.log("message from emit",message)
        io.emit("getNotification",{"message":"Product Added Successfully","data":message})
      })
  
      socket.on("disconnect", () => {
          console.log("someone has left")
      })
  });
  
  io.listen(8080);

