const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json())

const verifyJWT = (req, res, next) => {
    clientSiteHeader = req.headers.authorization;
    if (!clientSiteHeader) {
        return res.status(401).send({ message: 'You Are UnAuthorized' });
    }
    const userToken = clientSiteHeader.split(' ')[1];

    jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({message: 'Forbidden'})
        }
        req.decoded = decoded;
        next();
    });

    console.log('Verify Token from Server verifyJWT Function :- ', clientSiteHeader);
}

// root/main API
app.get('/', (req, res) => {
    // i used HTML tag in here 
    res.send(' Hello, Server Connection is Working ')
});

app.post('/login', (req, res) => {
    const user = req.body;
    // const myName1 = req.kib1;
    // const myName2 = req.kib2;
    // const myName3 = req.kib3;
    // console.log(user, myName1, myName2, myName3);
    console.log(user,);
    // Danger: Do not check/send directly pass in here
    // use encrypted way for this 
    // make sure Any encrypted token allow After Authentication confirm: first login pass email right then token allow or creat for this.

    if (user.email === 'kibriakhandaker66@gmail.com' && user.password === '123') {
        const accessToken1 = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        res.send({
            success: true,
            accessToken2: accessToken1,
        })
    } else {
        res.send({ success: false })
    }
})

app.get('/orders', verifyJWT, (req, res) => {
    // console.log('Verify Token from Server Get orders API :- ',req.headers.authorization);
    res.send([{ id: 1, item: 'Sun-Glass' }, { id: 2, item: 'Phone' }])
})

app.listen(port, () => {
    console.log('Hi, Kibria, You Server is Running to localhost Port', port);
})