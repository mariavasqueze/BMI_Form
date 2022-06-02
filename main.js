const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('bmi', { bmiResult: ''});
})

app.post("/", (req, res) => {
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);
    let bmi = weight / Math.pow((height / 100), 2);
    bmi = bmi.toFixed(1);

    res.render('bmi', {bmiResult: "Your bmi is: " + bmi});
})

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status =404;
    next(err);
  })
  
  app.use((err, req, res, next) => {
    res.render('error', {error: err});
  });

app.listen(port, () => {
    console.log('Listening on port 3000');
})
