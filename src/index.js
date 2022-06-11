const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://functionup-cohort:G0Loxqc9wFEGyEeJ@cluster0.rzotr.mongodb.net/Pritesh8769811-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


const middleWare=   function (req, res, next) {
        var currentDate = new Date()
        var dateTime= currentDate.getFullYear()+"-"
        + (currentDate.getMonth()+1)+"-"
        + currentDate.getDate() +" "
        + currentDate.getHours()+":"
        + currentDate.getMinutes()+":" 
        + currentDate.getSeconds();
        let ip = req.ip
        let url = req.originalUrl
        console.log (dateTime +  " , " + ip + " , " + url);
        next();
    }
app.use(middleWare)

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
