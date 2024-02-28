const mongoose = require('mongoose');



const username = encodeURIComponent("vanshil");
const password = encodeURIComponent("Vv#9426422022");

let uri = 'mongodb+srv://${username}:${password}@cluster0.y9eqc21.mongodb.net/'


mongoose.connect(uri);



const UserSchema  = new mongoose.Schema({
    username : String,
    password  :String
})



export const User = mongoose.model('User', UserSchema )