require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = async () => {
    const db = require('./config/db');
    await db();
};

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/contact', require('./routes/messageRoutes'));

// Root endpoint for status check
app.get('/', (req, res) => {
    res.send('Portfolio API Server is running...');
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
