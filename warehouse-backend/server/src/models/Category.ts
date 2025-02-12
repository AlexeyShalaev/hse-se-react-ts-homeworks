import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

categorySchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
