const users=[]
const addUser=({id,room,username})=>{
username=username.trim().toLowerCase()
room=room.trim().toLowerCase();
if(!room||!username)
{
return{
error:'please provide room and username'
}

}
const existingUser=users.find((user)=>{

return user.room === room && user.username===username
})

if( existingUser)
return {error:'user already in room'}
//javascriptobject shorthand synatax real obj={id:id,,username:username} 
const user={id,room,username}
users.push(user)
return {user}
}

const removeUser=(id)=>{
const index=users.findIndex((user)=>user.id===id)
if(index!=-1)
return users.splice(index,1)[0]

}

const getUser=(id)=>{ 
return user=users.find((user)=>user.id===id)
}


//addUser({
//id:'1',
//room:"aaaa",
//username:"ram"})


const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

//const res=getUsersInRoom("aaaa")

module.exports={
addUser,
removeUser,
getUser,
getUsersInRoom
}

