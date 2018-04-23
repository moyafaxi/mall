<template>
 <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" @click="sortGoods()" class="price">Price</a>
            <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked=='all'}">All</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" @click="addCart(item.productId)" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                  <img src="/static/loading-svg/loading-bubbles.svg" v-show="loading">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
      <nav-footer></nav-footer>
 </div>
</template>

<script>
 import  './../assets/css/base.css'
 import  './../assets/css/product.css'

 import NavHeader from './../components/NavHeader.vue'
 import NavFooter from './../components/NavFooter.vue'
 import NavBread from './../components/NavBread.vue'
 import axios from 'axios'

 export default {
   data () {
     return {
       page:1,
       pageSize:8,
       goodsList:[],
       priceFilter:[
                  {
                      startPrice:'0.00',
                      endPrice:'100.00'
                  },
                  {
                    startPrice:'100.00',
                    endPrice:'500.00'
                  },
                  {
                    startPrice:'500.00',
                    endPrice:'1000.00'
                  },
                  {
                    startPrice:'1000.00',
                    endPrice:'5000.00'
                  }
                ],
      priceChecked:'all',
      filterBy:false,
      overLayFlag:false,
      sortFlag:true,
      busy: false,
      loading:false
     }
   },
   components:{
     NavHeader:NavHeader,
     NavFooter:NavFooter,
     NavBread:NavBread
   },
   mounted:function(){
    this.getGoodsList();
   },
   methods:{
     
     getGoodsList(){
        this.loading=true;

        let params = {
        page:this.page,
        pageSize:this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel:this.priceChecked
       }
       axios.get("/goods",{
         params:params
       }).then((res)=>{
          console.log(res);
          this.loading=true;
         
          if(this.page==1){
            this.goodsList=res.data.result.list
            }else{
              this.goodsList=this.goodsList.concat(res.data.result.list);
            }
           
         
       })
     },
     setPriceFilter(index){
              this.priceChecked = index;
              this.page = 1;
              this.getGoodsList();
            },
     showFilterPop(){
              this.filterBy=true;
              this.overLayFlag=true;
            },
     closePop(){
              this.filterBy=false;
              this.overLayFlag=false;
            },
     loadMore(){
              this.busy = true;
              this.getGoodsList();
              
              setTimeout(() => {
                this.page++;
                this.busy = false;
              }, 1000);
      },
     sortGoods(){
        this.sortFlag = !this.sortFlag ;
        this.page = 1;
        this.getGoodsList();
      },
      addCart(productId){
        axios.post('/users/addcart',{productId:productId}).then((response)=>{
          console.log(response);
            if(response.data.status=='0'){
              alert('添加成功');
            }else{
              alert('添加失败');
            }
        })
      }
   }
 }
</script>

<style>


</style>
