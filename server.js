const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')

const app = express();

const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'din',
      password: '123',
      database: 'facialapp',
    },
});

app.use(bodyParser.json());
app.use(cors());


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'Sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(3000, (req, ) => {
    console.log('App is running on port 3000');
})