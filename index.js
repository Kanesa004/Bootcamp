const express = require('express')
const userRouteres = require('./Routers/userRouters');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRouteres);

app.listen(PORT, ()=> {
   console.log(`http://localhost:${PORT}`);

})