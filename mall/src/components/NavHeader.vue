<template>
       <header class="header">
        <div class="navbar">
          <div class="navbar-left-container">
            <a href="/">
              <img class="navbar-brand-logo" src="/static/logo.png"></a>
          </div>
          <div class="navbar-right-container" style="display: flex;">
            <div class="navbar-menu-container">
              <!--<a href="/" class="navbar-link">我的账户</a>-->
              <span class="navbar-link" v-text="nickName" v-if="nickName"></span>
              <a href="javascript:void(0)" @click="loginModalFlag=true" v-if="!nickName" class="navbar-link">Login</a>
              <a href="javascript:void(0)" @click="logout" class="navbar-link" v-if="nickName">Logout</a>
              <div class="navbar-cart-container">
                <span class="navbar-cart-count"></span>
                
              </div>
            </div>
          </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">Login in</div>
              <button class="md-close" @click="loginModalFlag=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show"  v-show="errorTip">用户名或者密码错误</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="login">登  录</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
      </header>
</template>

<script>
import './../assets/css/login.css'
import axios from 'axios'
 export default {
   data () {
     return {
        userName:'admin',
        userPwd:'123456',
        errorTip:false,
        loginModalFlag:false,
        nickName:''
     }
   },
   methods:{
     login(){
       if(!this.userName || !this.userPwd){
         this.errorTip=true;
         return;
       }
       let params = {
        userName:this.userName,
         userPwd:this.userPwd
       }
       axios.get('/users/login',{
         params:params
       }).then((response)=>{
         console.log(response)
         let res = response.data;
         if(res.status=='0'){
           this.errorTip=false;
           this.loginModalFlag=false;
           this.nickName=res.result.userName;
         }else{
           this.errorTip=true;
         }
       }).catch((e)=>{
         console.log(e)
       })
     },
     logout(){
       axios.post('/users/logout').then((response)=>{
         let res = response.data;
         if(res.status=='0'){
           console.log('success');
         }
       })
     }
   },
   components: {

   }
 }
</script>

<style>
  .header {
    width: 100%;
    background-color: white;
    font-family: "moderat",sans-serif;
    font-size: 16px;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5px 20px 10px 20px;
  }
  .navbar-left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
  }
  .navbar-brand-logo {
    /*width: 120px;*/
  }
  .header a, .footer a {
    color: #666;
    text-decoration: none;
  }
  a {
    -webkit-transition: color .3s ease-out;
    transition: color .3s ease-out;
  }
  .navbar-right-container {
    display: none;
    justify-content: flex-start;
    align-items: center;
  }
  .navbar-menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
  }
  .navbar-link {
    padding-left: 15px;
  }
  .navbar-cart-container {
    position: relative;
  }
  .navbar-cart-count {
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -9px;
    right: -11px;
    width: 20px;
    border-radius: 10px;
    color: white;
    background-color: #eb767d;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .navbar-cart-logo {
    width: 25px;
    height: 25px;
    transform: scaleX(-1);
  }
 
</style>
