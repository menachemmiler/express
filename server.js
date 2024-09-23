import express, { json } from 'express';
const app = express();
const PORT = 3000;
import { Amn } from './Amn.js';
import fs from 'fs/promises';

//req.params.id...

const getData = async (path) => {
    const data = await fs.readFile(path, "utf-8");
    return data;
}


app.get('/', (req, res) => {
    res.send("hello to api amn");
});


app.get('/amn', async (req, res) => {
    try{
        const data = await getData("./Amn.json");
        res.setHeader("Content-Type", "application/json");
        res.json(JSON.parse(data));
    }catch (err) {
        //מחזיר שגיאה ללקוח עם סטטוס 500 (שגיאת שרת)
        res.status(500).json({
            err:true,
            message:err
        })
    }
});

app.get('/amn/:id', async (req, res) => {
    try{
        const data = await getData("./Amn.json");
        const toJson = await JSON.parse(data);
        // const amn = await toJson.filter((a) => {return})
    }catch (err) {
        //מחזיר שגיאה ללקוח עם סטטוס 500 (שגיאת שרת)
        res.status(500).json({
            err:true,
            message:err
        })
    }
});

app.get('/amn/sum', (req, res) => {

});

app.post('/amn', (req, res) => {

});

app.patch('/amn/', (req, res) => {

});


app.listen(PORT, () => {
    console.log(`listen to port ${PORT}`)
})


