import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        stock: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);

productSchema.set('toJSON', {
    virtuals: true, // Позволяет использовать `id`
    transform: (_, ret) => {
        ret.id = ret._id; // Заменяем `_id` на `id`
        delete ret._id; // Удаляем `_id`
        delete ret.__v; // Удаляем версию документа
        return ret;
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
