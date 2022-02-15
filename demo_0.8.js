const http=require('http');
const express=require('express');



////////////////////////
const appTest=express();
const portTest=1600;

////////////////////////
appTest.use(express.json());
appTest.use(express.urlencoded({extended:false}));
appTest.use(express.static(__dirname+'/publicTest2'));

////////////////////////
appTest.set('views', __dirname+'/viewTest2');
appTest.set('view engine','ejs');
appTest.engine('html',require('ejs').renderFile);
const routeTest=require('./route/routeTest2');
appTest.use('/',routeTest);

////////////////////////
appTest.listen(portTest,()=>{
    console.log("Test server runnig on ",portTest)
});



////////////////////////
const appDemo=express();
const portDemo=1700;

////////////////////////
appDemo.use(express.json());
appDemo.use(express.urlencoded({extended:false}));
appDemo.use(express.static(__dirname+'/publicDemo2'));

////////////////////////
appDemo.set('views', __dirname+'/viewDemo2');
appDemo.set('view engine','ejs');
appDemo.engine('html',require('ejs').renderFile);
const routeDemo=require('./route/routeDemo2');
appDemo.use('/',routeDemo);

////////////////////////
appDemo.listen(portDemo,()=>{
    console.log("Demo server runnig on ",portDemo)
});