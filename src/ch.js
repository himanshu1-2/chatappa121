const express=require('express')
const app=express()
const Filter=require('bad-words')
const path = require('path')
const port = process.env.PORT || 3000
const socketio=require('socket.io')
const http=require('http')
const {addUser,removeUser,getUser,getUsersInRoom}=require('./utils/user')
//we use .. to get out from directory since utils is same dir as src we dont use ..
const {genrateMessage}=require('./utils/message')
const server=http.createServer(app)
const io=socketio(server)
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

//io used only for connection
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

socket.on('join',({username,room},callback)=>{
socket.join(room)
const {error,user}=addUser({id:socket.id,room,username})
//error is from addUser is used as argument in callback function
if(error)
 return  callback(error)

//send data to client single client
    socket.emit('message', genrateMessage('Admin','Welcome'))
console.log(genrateMessage('Admin','Welcome'))
//sending message to everybody except to current user
//socket.broadcast.emit('message',genrateMessage('a new user has joined'))
//specfic to group by to function
socket.broadcast.to(user.room).emit('message',genrateMessage('Admin',`${user.username} has joined`))
 io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

callback()

})



//recieve data from client using a callback   
 socket.on('sendMessage', (message,callback) => {
//send data to all client    
//callback server acknowlege client  
const user=   getUser(socket.id)
  

const filter =new Filter()
//emit takes object 2nd argument
if(filter.isProfane(message))
 return callback('bad words not allowed')
//send data to everyclient by server when a client send message
io.to(user.room).emit('message', genrateMessage(user.username,message))
callback()  })



//bulit in method when client leaves
socket.on('disconnect',()=>{
const user=removeUser(socket.id)
io.to(user.room).emit('message',genrateMessage('Admin',`${user.username} has left`))
io.to(user.room).emit('roomdata',{
room:user.room,
users:getUsersInRoom(user.room)

})

})
})


server.listen(port,()=>{
console.log('server is running ')
})

