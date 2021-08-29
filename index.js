const express = require('express');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routes);

app.listen(port);
console.log(`Server running on Port ${port}`);
