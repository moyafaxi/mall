var express = require('express');
var mongoose = require('mongoose');
var Goods = require('./../models/goods');
var router = express.Router();


//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected success.")
})

mongoose.connection.on("error",()=>{
    console.log("MongoDB connected fail.")
})

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected.")
})

//查询商品
router.get('/',(req,res,next)=>{
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = parseInt(req.param("sort"));
    let skip = parseInt((page-1)*pageSize);
    let priceLevel = req.param("priceLevel");
    let callback = req.param("callback");
    var priceGt = '' , priceLte = '';
    let params = {};

    if(priceLevel != 'all'){
        switch(priceLevel){
            case '0' : priceGt = 0; priceLte = 100; break;
            case '1' : priceGt = 100; priceLte = 500; break;
            case '2' : priceGt = 500; priceLte = 1000; break;
            case '3' : priceGt = 1000; priceLte = 5000; break;
        }
        params = {
           salePrice:{
               $gt:priceGt,
               $lte:priceLte
           } 
        }
    }
    
    

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort});

    goodsModel.exec({},(err,doc)=>{

        if(err){
            
            res.json({
                status:"1",
                msg:err.message
            })
        }else{
            let data = {
                status:'0',
                msg:'success',
                result:{
                    count:doc.length,
                    list:doc
                }
            };
            res.json(data);

            // res.send(callback+'('+JSON.stringify(data)+')');
        }
    })
})


//添加购物车

router.post("/goods/addCart",(req,res,next)=>{
    
})


module.exports = router;