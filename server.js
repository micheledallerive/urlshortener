const express = require('express');
const app = express();
const path = require("path");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "url_shortener"
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", 'index.html'));
});

connection.connect();
app.get("/:url", (req,res)=>{
    var url = req.params.url;
    connection.query("SELECT * FROM urls WHERE suffix='"+url+"'", function(err,rows,fields){
        if(rows==0){
            res.send("ESKERE");
        }else{
            res.redirect(rows[0].url)
        }
    });
});

generatesuffix = function(){
    
    return result;
}

app.get("/generate/:url", (req,res)=>{
    var url = req.params.url;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 7; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    suffix = result;
    connection.query("INSERT INTO urls (suffix,url) VALUES ('"+suffix+"', '"+url+"')", function(err,rows,fields){
        if(err) throw err;
        res.send(suffix);
    });
});

app.listen(3000, () => console.log('Gator app listening on port 3000!'));