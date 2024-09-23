import express from 'express';
const app = express();
const PORT = 7000;


app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.listen(PORT, () => {
    console.log(`listen to port ${PORT}`)
})


