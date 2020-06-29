const socket=io()
const $messages = document.querySelector('#messages')
const messageTemplate = document.querySelector('#message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
//location of search giver after string from baseurl


const {username,room}=   Qs.parse(location.search,{ignoreQueryPrefix:true})
console.log({room})
socket.on('message', (message) => {
   console.log(message.username)
 const html = Mustache.render(messageTemplate, {
      username:message.username,  
      message:message.text,
         createdAt:moment(message.createdAt).format('h:mm a')
         
    })
    $messages.insertAdjacentHTML('beforeend', html)
 console.log(message.text,moment(message.createdAt).format())
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()


    const message = e.target.elements.message.value
  //  3rd argument message acknowlegment 2 arg actual message
socket.emit('sendMessage', message,(error)=>{
    
   if(error)
   return console.log('error language')


console.log('blue tick')
   
})
})

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})



socket.emit('join',{username,room},(error)=>{
if(error)
 
{ alert(error)
  location.href='/'
}
})



