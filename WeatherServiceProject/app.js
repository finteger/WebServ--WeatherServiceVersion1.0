const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Weather = require('./weather.js');



const app = express();


app.set('views', './views');
app.set('view engine', 'ejs');


app.use(express.static('./public/images'));
app.use(express.static('./public/css'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


const url = `mongodb+srv://ToddN:Password@cluster0.7as6vrs.mongodb.net/weather`;


//Set connection params
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(url, connectionParams)
.then(()=>{
console.log('Connected to MongoDB noSQL database.');
})
.catch((err) =>{
console.error(`Error connecting to the database: ${err}`);
});


//Home page
app.get('/', (req, res) =>{

try{
res.render('home');
} catch(err) {
 res.status(500).send(`An error occured: ${error} `);
}

});


//Weather tracking page.
app.get('/tracker', (req, res) =>{

try{
    res.render('tracker');
    } catch(err) {
     res.status(500).send(`An error occured: ${error} `);
    }

});


//Input weather data
app.post('/weather', async (req, res)=>{

const weatherData = new Weather({
city: req.body.city,
temperature: req.body.temperature,
humidity: req.body.humidity,
});

//Save weather input data
try{
await weatherData.save();
res.redirect('/tracker');
}catch(error){
res.status(500).send(`An error occurred: ${error}`);
}
});






//Start the server
const port = process.env.Port || 3000;

app.listen(port, () =>{
console.log(`Connected to web service on port ${port}.`)
})