const express = require('express');
const app     = express();
const cors    = require('cors');
const PORT    = process.env.PORT || 3000;

// middlewares
app.use(express.static('public'))
app.use(cors());
app.use(express.json());

// routers
app.use('/voices', require('./routes/voice'))

// start
app.listen(PORT, () => {console.log(`Server start on port: ${PORT}`);});