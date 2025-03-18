import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    group: { type: String, required: true, default: 'user' },
    refreshToken: { type: String, default: null },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;
