var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var Good = require('./../models/goods');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/login',(req,res,next)=>{
  var params = {
    userName:req.query.userName
  }
  console.log(typeof req.query.userPwd);
  console.log(JSON.stringify(params));
  User.findOne(params,(err,doc)=>{
    console.log('test1');
    if(err){
      res.json({
        status:"1",
        msg:err.message,
      })
    }else{
      console.log('test2');
      if(doc){
        console.log('test3');
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60
        })
        res.json({
          status:"0",
          msg:'',
          result:{
            userName:doc.userName
          }
        })
      }
      
    }
  })
});



router.post('/logout',(req,res,next)=>{
  res.cookie("userId","",{
    path:'/',
    maxAge:0
  }),
  res.json({
    status:'0',
    msg:'',
    result:''
  })
})


router.post('/addCart',(req,res,next)=>{
   let userName = 'admin'; 
   let productId = req.body.productId;
   
   User.findOne({userName:userName},(err,userDoc)=>{
     if(err){
       res.json({
         status:'1',
         msg:'未登录',
         result:''
       })
     }else{
       if(userDoc){
        let goodsItem = false;
        userDoc.cartList.forEach(element => {
          if(element.productId==productId){
            element.productNum++;
            goodsItem = true;
          }
        });
        if(goodsItem){
          userDoc.save((err2,doc2)=>{
            if(err2){
              res.json({
                status:'1',
                msg:err2.message,
                result:''
              })
            }else{
              res.json({
                status:'0',
                msg:'',
                result:'success'
              })
            }
          })
        }else{
          Good.findOne({productId:productId},(err,goodDoc)=>{
            goodDoc.productNum = 1;
            goodDoc.checked = 1;
            userDoc.cartList.push(goodDoc);
            userDoc.save((err2,doc2)=>{
              if(err2){
                res.json({
                  status:'1',
                  msg:err2.message,
                  result:''
                })
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'success'
                })
              }
            })
          })
        }
        
       }
     }
   })


})

module.exports = router;
