import express, { json } from 'express';
const app = express();
import { Amn } from './Amn.js';
import fs from 'fs/promises';
import { v4 as uuidv4, v4 } from 'uuid';
const PORT = process.env.PORT || 3000;

app.use(express.json());//ממיר את כל המידע שעובר בגוף הבקשה ל-json

//req.params.id...

const getDataAsJson = async (path) => {
    try{
        const data = JSON.parse(await fs.readFile(path, "utf-8"));
        return data;
    }catch (err) {
        throw new Error(err);
    }
}

const addDataToAmn = async (data) => {
    const amn = await getDataAsJson('./Amn.json');
    amn.push(data);
    await fs.writeFile('./Amn.json', JSON.stringify(amn), {encoding: "utf-8"});
};



//http://localhost:3000/
app.get('/', (req, res) => {
    res.send("hello to api amn");
});


//http://localhost:3000/amn
app.get('/amn', async (req, res) => {
    try{
        const data = await getDataAsJson("./Amn.json");
        res.setHeader("Content-Type", "application/json");
        res.json(data);
    }catch (err) {
        //מחזיר שגיאה ללקוח עם סטטוס 500 (שגיאת שרת)
        res.status(500).json({
            err:true,
            message:err
        })
    }
});



//http://localhost:3000/amn/summery
app.get('/amn/summery', async (req, res) => {
    try{
        const data = await getDataAsJson('./Amn.json');
        if(!data)  res.status(404).send("erorr");
        const resulte = data.reduce((obg, curr) => {
            curr.active && obg.active++
            curr.status && obg.status++
            return obg
        }, {active:0, status:0});
        res.json({...resulte, sumAll:data.length});
    }catch (err) {
        res.status(500).json({
            err:true,
            message:err
        })
    }
});



//http://localhost:3000/amn/:id
app.get('/amn/:id', async (req, res) => {
    try{
        res.setHeader("Content-Type", "application/json");
        const data = await getDataAsJson("./Amn.json");
        const amn = await data.find(a => a.id == req.params.id);
        amn ? res.json(amn) : res.status(404).json({
            err:true,
            message:`amn with id ${req.params.id} not exist`})
    }catch (err) {
        //מחזיר שגיאה ללקוח עם סטטוס 500 (שגיאת שרת)
        res.status(500).json({
            err:true,
            message:err
        })
    }
});


app.patch('/amn', async (req, res) => {
    try{
        const {type, status, active, id} = req.body;
        const newAmn = {type, status, active, id};
        const currArr = await getDataAsJson('./Amn.json');
        const newArr = await currArr.map(a => a.id == id ? newAmn : a);
        await fs.writeFile('./Amn.json', JSON.stringify(newArr), {encoding: "utf-8"});
        res.json(newAmn);
    }catch (err) {
        res.status(500).json({
            err:true,
            message:err
        })
    }
});

app.delete('/amn/:id', async (req, res) => {
    try{
        const currArr = await getDataAsJson('./Amn.json');
        const newArr = await currArr.filter(a => a.id != req.params.id);
        await fs.writeFile('./Amn.json', JSON.stringify(newArr), {encoding: "utf-8"});
        res.json(newArr);
    }catch (err) {
        res.status(500).json({
            err:true,
            message:err
        })
    }
});


app.post('/amn', async (req, res) => {
    try{
        const {type, status, active} = req.body;
        const newAmn = {type, status, active, id:v4()};
        await addDataToAmn(newAmn);
        res.json(newAmn);
    }catch (err) {
        res.status(500).json({
            err:true,
            message:err,
            name:"post"
        })
    }
});




app.listen(PORT, () => {
    console.log(`listen to port ${PORT}`)
})


