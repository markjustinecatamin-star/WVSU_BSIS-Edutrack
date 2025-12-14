const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Test Server Running!</h1><p>WVSU-BSIS EduTrack is working!</p>');
});

app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
});