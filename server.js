const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
require('./server/config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pirataRoutes = require('./server/routes/pirata.routes');
const userRoutes = require('./server/routes/user.routes');





pirataRoutes(app);
userRoutes(app);

app.listen(port, () => console.log('Im listening so cool!'))