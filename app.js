require("dotenv").config();
const express = require('express');
const app = express();
const router = require('./routes/userRoute');  
app.use(express.json());
app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server up and running on PORT:', port);
});
