import express from 'express';
import Visitor from '../model/Visitor.js';
import validateVisitor from '../validation/validateVisitors.js';

const router = express.Router();

// Get all visitors
router.get('/', async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.status(200).json(visitors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/search/:role', async (req, res) => {
    const role = req.params.role;

    try {
        const visitors = await Visitor.find({ role }); // Find visitors by role
        res.status(200).json(visitors);
    } catch (error) {
        console.error("Error fetching visitors by role:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get one visitor
router.get('/:id', getVisitor, (req, res) => {
    res.json(res.visitor);
});

// Create a visitor
router.post('/', async (req, res) => {
    const { errors, isValid } = validateVisitor(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const visitor = new Visitor({
        name: req.body.name,
        visitDate: req.body.visitDate,
        email: req.body.email,
        city: req.body.city,
        role: req.body.role
    });

    try {
        const newVisitor = await visitor.save();
        res.status(201).json(newVisitor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a visitor
router.patch('/:id', async (req, res) => {
    const { name, visitDate, email, city, role } = req.body;
    try {
        const updatedVisitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            { name, visitDate, email, city, role },
            { new: true } // This option ensures the updated document is returned
        );

        if (!updatedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        res.json(updatedVisitor); // Respond with the updated visitor document
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a visitor
router.delete('/:id', async (req, res) => {
    try {
        const deletedVisitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!deletedVisitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.json({ message: 'Deleted Visitor' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a visitor by ID
async function getVisitor(req, res, next) {
    let visitor;
    try {
        visitor = await Visitor.findById(req.params.id);
        if (visitor == null) {
            return res.status(404).json({ message: 'Cannot find visitor' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.visitor = visitor;
    next();
}

export default router;
