import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    visitDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;
