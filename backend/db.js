const { default: mongoose } = require('mongoose');
const { Schema } = require('zod');


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

 const User = mongoose.model('User', UserSchema )
 const Account = mongoose.model('Account', AccountSchema)

module.exports = {
	User,
    Account
};