const express = require('express');
const app = express();
const path = require('path');

// Ścieżka do folderu publicznego
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Ścieżka do folderu z Biblią
const biblePath = path.join(__dirname, 'public/Bible');

// Obsługa żądania pobrania listy przekładów Biblii
app.get('/bibles', (req, res) => {
    const fs = require('fs');
    const bibles = fs.readdirSync(biblePath).map(filename => {
        return {
            value: filename,
            label: filename.replace('.json', '').replace(/_/g, ' ')
        };
    });
    res.json(bibles);
});

// Obsługa żądania pobrania danych z wybranego przekładu Biblii
app.get('/bibles/:translation', (req, res) => {
    const translation = req.params.translation;
    const bibleData = require(path.join(biblePath, translation));
    res.json(bibleData);
});

// Start serwera
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});