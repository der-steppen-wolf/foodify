const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

// Get environment variable port or a local port
const port = process.env.PORT || 3000; 

// set up handlebars
app.set('view engine', 'hbs');
// Views folder expected in root, set views to the location of templates folder
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Serve static content for the app from the “static” directory
app.use(express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) => {
    res.render('index', {
        title: "Foodify"});
});

app.get('/search-foods', (req, res) => {
    res.render('searchfoods', {
        title: "Foodify"});
});

app.get('/search-recipes', (req, res) => {
    res.render('searchrecipes', {
        title: "Foodify"});
});

app.get('/daily-intake-calculator', (req, res) => {
    res.render('dailyintakecalculator', {
        title: "Foodify"});
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorText: "Page not found"});
});

// port, callback called when server is up
app.listen(port, () => {
    console.log('Server is up on port ' + port);
})