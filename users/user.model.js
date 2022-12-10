const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    role:{type:String,required:false},
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    loginTime:{type:Date,required:false},
    logoutTime:{type:Date,required:false},
    clientIp:{type:String,required:false}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);