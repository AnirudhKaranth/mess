import express from 'express'
// import 'dotenv/config' //ani

import Mess from './models/Mess.js'
import User from './models/User.js'

import sequelize  from './DB/db.js';
// import bodyParser from 'body-parser' //ani
import cors from 'cors'

const app = express();
app.use(express.json());

const port = 3000;

// app.use(bodyParser.json({ limit : "30mb", extended: true}));
app.use(cors());

/////////////////////////////////////////////////////////////////////////
app.post('/', (req, res) => {
    res.send('running');
})

app.post('/add', (req, res) => {
let data = req.body;
Mess.create(data);
res.send({msg:'user added'})
})

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Server is running on port ${port}`);
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

  (async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }

   
    app.listen(port, () => {
        connectToDatabase();
    });
})();
