const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// routers
app.use('/voices', require('./routes/voice'))
app.use('/translate', require('./routes/translate'))

// start
app.listen(PORT, () => { console.log(`Server start on port: ${PORT}`); });