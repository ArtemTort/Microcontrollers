const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const PORT = config.get('PORT') || 3000;

const app = express();

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
// app.use('/t', require('./routes/redirect.routes'))

app.use('/', express.static(path.join(__dirname, 'client')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "view", "auth.html")); 
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "view", "error.html"));
})

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: "musienko_artem",
            pass: "YoCRM97RFWaXE9g9",
            dbName: "microcontroller_db",
            authSource: "admin",
        });
        app.listen(PORT, () => {
            console.log(`Server start on port: ${PORT}`);
        })
    } catch (err) {
        console.log('Server error: ', err.message);
        process.exit(1);
    }
}

start()

