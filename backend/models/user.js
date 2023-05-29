const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    docs: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Doc'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);