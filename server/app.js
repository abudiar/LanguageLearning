const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const router = require('./routes')

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// routers
app.use('/', router)

// start
app.listen(PORT, () => { console.log(`Server start on port: ${PORT}`); });