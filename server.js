// const express = require('express')
// const sqlite = require('sqlite3').verbose()
// const app = express()
// const port = 3000

// const db = new sqlite.Database("database.db", (err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("OK")
//     }
// })
// // yndhanur books mer zangvace tpelu hamar
// app.get('/cloths',(res,req)=>{
//     db.all("select * from cloths",[],(err,data)=>{
//         res.send(data)
//     })
// })
// // hat hat mer bookere tpelu hamar idnerov
// app.get('/cloths/:id', (req,res)=>{
//     const id = req.params.id
//     db.get("select * from cloths where id =?",[id],(err,data)=>{
//         res.send(data)
//     })

// })
// app.listen(port)



const express= require('express')
const sqlite = require("sqlite3").verbose()
const app = express()
app.use(express.json())
const port = 3000
const cors = require("cors")
app.use(cors())

const db = new sqlite.Database("database.db", (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("OK")
    }
})
app.get("/", (req,res)=>{
    db.all("select * from cloths", [], (err, data)=>{
        res.send(data)
    })

})

app.get("/cloths/:id", (req, res)=>{
    const id=req.params.id
    db.get("select * from cloths where id=?", [id], (err,data)=>{
        res.send(data)
    })
})

app.post("/new",(req,res)=>{
    const name = req.body.name
    const price = req.body.price
    const image = req.body.image
    db.run("insert into cloths(name, price,image) values(?,?,?)",[name,price,image],()=>
        res.send("ok"))
})

app.delete('/delete', (req,res) => {
    
    const id = req.body.id

    db.run('DELETE FROM cloths WHERE id=?;', [id],(err) => {
        res.send("Deleted")
    })
})

app.put('/update/:id', (req,res) => {
    
    const id = req.params.id
    const name = req.body.name
    const image = req.body.image
    const price = req.body.price
    
   

    db.run('UPDATE cloths SET name=?, price=?, image=? WHERE id=?', [name,price,image,id],(err) => {
        res.send("Update")
    })
})


app.listen(port)