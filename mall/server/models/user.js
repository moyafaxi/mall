var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "userId":String,
    "userName":String,
    "userPwd":Number,
    "orderList":Array,
    "cartList":[
       {
        "productId":String,
        "productName":String,
        "productPrice":String,
        "productImage":String,
        "checked":String,
        "productNum":String
       }
    ],
    "addressList":Array
})

module.exports = mongoose.model('User',userSchema);