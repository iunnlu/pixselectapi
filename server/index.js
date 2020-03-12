//For building rest api's
const express = require('express');
//For parsing request body data's.
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const app = express();
const streams = require('./rtsp-server');

streams.stream1();
streams.stream2();

//Connect to DB
mongoose.connect('mongodb+srv://admin:5224667@pixselectproject-srl3o.mongodb.net/pixselectdb?retryWrites=true&w=majority', 
                { useNewUrlParser: true, useUnifiedTopology: true },
                () => {
                    console.log("Connected to DB!")

                })

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(express.json());
app.use('/api', authRoute);

//Listening on 3001 port!
app.listen(3001, () => console.log('Listening 3001'));