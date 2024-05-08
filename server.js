require('dotenv').config();
const State = require('./models/State');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const routes = require('./routes/api/routes');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));


app.use('/', require('./routes/root'));
app.use('/logout', require('./routes/logout'));
app.use('/states', require('./routes/api/states'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
