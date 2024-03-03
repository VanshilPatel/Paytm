import { Schema } from 'zod';

const mongoose = require('mongoose');



const username = encodeURIComponent("vanshil");
const password = encodeURIComponent("Vv#9426422022");

let uri = 'mongodb+srv://${username}:${password}@cluster0.y9eqc21.mongodb.net/'


mongoose.connect(uri);



const UserSchema  = new mongoose.Schema({
    username :{
        type: String,
        required : true,
        minLength: 3,
        maxLength: 30,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password  :{
        type: String,
        required : true,
        minLength: 8,

    },
    firstName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})



const AccountSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId , ref: "User", required: true},
    balance :{type : Number , required: true}

})

export const User = mongoose.model('User', UserSchema )
export const Account = mongoose.model('Account', AccountSchema)

