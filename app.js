var express = require('express');

var mysql = require('mysql');
var bodyParser = require('body-parser');
var pinyin = require("pinyin");
/////////////////////////////开一个服务器
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'abcd'
})
connection.connect();


app.listen(3000,function(){
	console.log('服务器在3000端口');
})

///////*用户的请求包含资源地址 -->/admin   */
app.get('/admin',function(req,res){
	res.sendFile(__dirname + '/site/index.html');
})
app.get('/',function(req,res){
	res.sendFile(__dirname + '/site/main.html');
})
app.get('/user',function(req,res){
	var sql = 'select * from user';//
	connection.query(sql,function(err,rows){
		res.json(rows);
	})
})
.post('/user', function(req, res){
	var sql = 'insert into user set ?';
	connection.query(sql, {name: ''}, function(err, result){
		if(!err){
			res.json({id: result.insertId});
		}
		
	})
})
.put('/user', function(req, res){
	if(req.body.name){
		var o = pinyin( req.body.name, {style: pinyin.STYLE_NORMAL}).join('');
		var sql = 'update user set name = ?, pinyin = ? where id = ?';
		connection.query(sql, [req.body.name, o, req.body.id], function(err, result){
			if(!err){
				res.json(result.name);
			}
			console.log(o)
		})
	}else if(req.body.phone){
		var sql = 'update user set phone = ? where id = ?';
		connection.query(sql, [req.body.phone, req.body.id], function(err, result){
			if(!err){
				res.json(result.phone);
				console.log('haha')
			}
		})
	}
	console.log({state: 'ok'})
})
.delete('/user', function(req, res){
	var sql = 'delete from user where id = ?';
	connection.query(sql, [req.body.id], function(err, r){
		if(!err){
			res.json({state: 'ok'})
		}
	})
	
})
///////////////////////利用web服务器的一个use函数 将    文件夹公开
app.use(express.static(__dirname + '/site/public'))
console.log('app')

/*
 insert into set name = ""
 
 * */
/*app.get('/user', function(req, res){
	res.sendFile(__dirname + '/site/index.html');
})
app.use(express.static(__dirname + '/site/public'))*/