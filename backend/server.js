const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const promptRoutes = require('./routes/promptRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.log("MongoDB connection error:", error);
});

// Routes
app.use('/api', promptRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
