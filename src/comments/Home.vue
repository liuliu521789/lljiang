<template>
   
<el-container class="container">
  <el-header class="header">
    <div class="su"></div>
      <div class="logo">
          <img src="../assets/lol-logo.png" alt="">
<span>
拳头后台管理系统
</span>
      </div>
      
      <button @click="leave" class="leave">supreme</button>
  </el-header>
  <el-container>
    
    <el-aside :width="this.width" class="aside"><el-row class="tac">
  <div id="toggle" @click="toggle">| | |</div>
    <el-menu 
      :default-active="this.activePath"
      :collapse="iscol"
:collapse-transition="false"
      :unique-opened="true"
      background-color="#fff"
      text-color="#333"
      active-text-color="#646eb3" id="aside" router>
      <el-submenu  v-for="item in menusList" :key="item.id" :index="item.id+''" >
        <template slot="title">
          
<i :class="fa[item.id]"></i>
        
          
          <span>{{item.authName}}</span>
        </template>
       <el-menu-item @click="lo('/'+item.path)" v-for="item in item.children" :key="item.id" :index="'/'+item.path">
         <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item.authName}}</span>
        </template>
       </el-menu-item>
     
        
      
      </el-submenu>
      
    </el-menu>
 
  
</el-row></el-aside>
    <el-main class="main">
      <router-view></router-view>
      
    </el-main>
  </el-container>
</el-container>
</template>
<script>

export default {
  
    data(){
        return{
          menusList:[],
          fa:{'125':'el-icon-user-solid','103':'el-icon-s-help'
          ,'101':'el-icon-s-goods','102':'el-icon-s-order',
          '145':'el-icon-s-marketing'},
          iscol:false,
          width:'200px',
          activePath:'',
        }
    },
  created(){
    this.getMenu();
    this. activePath= window.sessionStorage.getItem('activePath');
  },
    methods:{
      toggle(){
this.iscol=!this.iscol
if(this.iscol==true){
  this.width='60px'
}else{
  this.width='200px'

}
      },
      lo(a){console.log(a);
      window.sessionStorage.setItem('activePath',a);
      this. activePath=a;
      },
leave(){
    window.sessionStorage.clear(),
    this.$router.push('/login')
}, handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
     async getMenu(){
        const {data:res}=await this.$http.get('menus');
        console.log(res);
        if(res.meta.status!==200) return this.$message.error(res.meta.message)
        
        this.menusList=res.data
      }
    }
       
}
</script>
<style lang="less" scoped>
.container{
    height: 100%;
    
}
.header{
    // background-color: #282c47;
     background:-webkit-linear-gradient(top,#282c47,#373c61);
    // background: url(../assets/su.png);
    // background-size: 100% 100%;
      // box-shadow: 0 0px 20px #000;
      z-index: 999;
    .logo{
        position: absolute;
        width: 400px;height: 60px;
span{
        color: #fff;
        font-size:20px
   }
   img{
       margin-left: 20px;
       height: 60px;
       vertical-align: middle;
      transform: scale(2)
   }
    }

   
}


.main{
    background-color:#f5f5f5;
padding: 0;
}
.leave{
    width: 100px;
    height: 34px;
   border:0;
    color:#fff;
    background: -webkit-linear-gradient(left bottom,#EF5350,#E57373);
    border-radius: 5px;
    position: absolute;
    right: 20px;
    top:12px;
    transition: all .6s;
   font-size: 16px;
     font-weight: bolder;
     
}
.leave:hover{
    background: -webkit-linear-gradient(left bottom,#000,#333);
    
 
    color:#fff;

   cursor: pointer;
}
#col{
  width: 100%;
}
.aside{
    background-color: #fff;
    border-right:1px solid  #e6e6e6;
    
}
#aside{
background-color: #fff;
border-right:0;
}
.su{position: absolute;width: 100%;height: 60px;}
#toggle{width: 100%;height: 50px;text-align: center;line-height: 50px;color:#fff ; 
background-color: #414874;cursor: pointer;border-bottom:1px solid #f5f5f5;border-radius: 0px 0px 20px 20px;}
.tac{background-color: #fff;}
</style>