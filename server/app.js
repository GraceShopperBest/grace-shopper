const path = require('path');
const express = require('express');
const app = express();

module.exports = app;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use("/api", require('./api'));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

app.use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
});
