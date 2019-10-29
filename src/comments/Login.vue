<template>
    <div class="Login-conent">
        <div class="left">S</div>
        <div class="login-box">
           <div id="cover">K</div>
            <div class="avatar-box">
                <img src="../assets/mao.jpg" alt="">
            </div>
             <h2>用户登录</h2>
            <!-- 登录表单区域 -->
            <el-form ref="loginformRef" :model="LoginForm"  :rules="logonFormRule" class="login-form" label-width="0ox">
  <el-form-item id="inputs" prop="username">
    <el-input v-model="LoginForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item id="inputs" prop="password">
    <el-input v-model="LoginForm.password" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item class="btns">
        <el-button id="login" @click="login"  type="primary">登录</el-button>
        
        <el-button id="reset" @click="resetForm" type="primary" plain>重置</el-button>
  </el-form-item>
  </el-form>
        </div>
        <div class="right">r</div>

    </div>
</template>
<script>

export default {
    data(){
       return{
           LoginForm:{
               username:'admin',
               password:'123456'
           },
           logonFormRule:{
               username:[  { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
             password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ]
           }
       }
  
    },
     methods:{
            resetForm(formName){
        this.$refs.loginformRef.resetFields();
        },
        login(){
            this.$refs.loginformRef.validate(async valid=>{
                console.log(valid)
               if(!valid) return
             const {data:res}= await this.$http.post("login",this.LoginForm) 
             console.log(res)
         if(res.meta.status==400) return  this.$message.error("登录失败")
         this.$message.success("登陆成功")
         window.sessionStorage.setItem("token",res.data.token)
         this.$router.push('/home')
         })
        }
      
       }
};
</script>
<style lang="less" scoped>
h2{color:#fff;position: absolute;left:50%;transform: translate(-50%);top:80px;opacity: 0.7;}
.Login-conent{
    // background-color: #2b4b6b;
    background: radial-gradient(#4679ac, #2b4b6b);
    // background: radial-gradient(rgb(136, 136, 136), rgb(88, 88, 88));
    height: 100%;
}
#cover{
    position: absolute;
    background-color: #333;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    opacity: 0.6;
    color:#ccc;
    text-align: center;
    line-height: 515px;
    font-size: 400px;
}
.login-box{
    width: 400px;
   height: 515px!important;
    border-radius: 10px;
    // background-color: #fff;
    background: url(../assets/sg.jpg);
    background-size: 100% 100%;
    box-shadow: 0 1px 26px 0 rgba(0,0,0,0.14), 0 2px 27px -1px rgba(0,0,0,0.12), 0 1px 10px 0 rgba(0,0,0,0.2);
    position: absolute;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%);

}
.left{
     width: 400px;
   height: 515px;
   position: absolute;
    left:150px;
    top: 50%;
    transform: translate(0,-50%);
   opacity: 0.6;
    color:#ccc;
    text-align: center;
    line-height: 515px;
    font-size: 400px;
}
.right{
     width: 400px;
   height: 515px;
   position: absolute;
    right:150px;
    top: 50%;
    transform: translate(0,-50%);
   opacity: 0.6;
    color:#ccc;
    text-align: center;
    line-height: 515px;
    font-size: 400px;
}
.avatar-box{
    width: 130px;height: 130px;border-radius: 50%;padding: 5px;
    box-shadow: 0 0 5px #333;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;

    }
}
.login-form{
    position: absolute;bottom:50px;
    width: 100%;
    top: 200px;
    padding: 20px;
    box-sizing: border-box;
}
.btns,#inputs{
    opacity: 0.8
}
#inputs{
    margin-top: 30px
}
.btns{
    display: flex;
    justify-content: center;
    // position: absolute;
    // left: 50%;
    
    // transform: translate(-50%)
}
#login,#reset{
    width: 150px;
}
#reset{
    background-color: #fff;
    
}
#reset:hover{
    background-color: #ecf5ff;
    color: #409EFF;
}
</style>