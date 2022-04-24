
const express = require('express')
const input = require('./input')
var bodyParser = require('body-parser')


const app = express()
const PORT = 3000
app.listen(PORT, () => console.log('listening att http:/localhost:${PORT}'))
app.use(express.static('public'));
app.use(bodyParser.json());

//change name to "*"; name length = number of characters
let out_name = input.name.length;
let out_name_stars = "*".repeat(out_name)

//change username to "*"; username length = number of characters
let out_username = input.username.length;
let out_username_stars = "*".repeat(out_username)

//change first part email to "*"; name email length = number of characters
let out_email = input.email;
let from = out_email.search("@");
let email_stars = "*".repeat(from);
let after = out_email.slice(from)
let out_email_stars = email_stars + after;

// change objects in array "friends" 
const obj  = JSON.parse(JSON.stringify(input))
obj.friends = obj.friends.map(el=> ({...el, username: '*'.repeat(el.username.length)}))
const output= JSON.stringify(obj.friends)




const player ={
    id: input.id,
    name: out_name_stars,
    username: out_username_stars,
    email: out_email_stars,
    age:input.age,
    power: input.power,
    friends: output

}


const fs = require('fs')

const saveData = (player) =>{
    const finished = (error) => {
        if(error){
            console.error(error)
            return;
        }
    }
   const jsonData =  JSON.stringify(player, null, 2)
   fs.writeFile('output.json', jsonData, finished)
   console.log(player);
   console.log(jsonData)
}
saveData(player)
