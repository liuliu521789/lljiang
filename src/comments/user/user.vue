<template>
    <div>
<el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  
</el-breadcrumb>
<el-card class="box-card">
    <el-row :gutter="20">
        <el-col :span="7"><el-input clearable @clear="user" v-model="queryinfo.query" placeholder="请输入内容" class="input-with-select">
    
    <el-button slot="append" icon="el-icon-search" class="search" @click="user"></el-button>
      

  </el-input></el-col>
        <el-col :span="4">
            <el-button type="primary"  @click="add">添加用户</el-button>
        </el-col>
    </el-row>
   <el-table
   
    :data="tabledata"
    border
    style="width: 100%">
    <el-table-column
    type="index"
    >
     
      
     
    </el-table-column>
    <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="email"
     
      label="邮箱">
    </el-table-column>
    <el-table-column
     prop='mobile'
      label="电话">
    </el-table-column>
    <el-table-column
     prop='role_name'
      label="角色">
    </el-table-column>
    <el-table-column prop="mg_state" label="状态">  
      <template slot-scope="scope">   
     <el-switch v-model="scope.row.mg_state" @change="change(scope.row)"></el-switch>
<div class="happy">一键开启好心情</div>
      </template>   
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
  <el-button type="primary" @click="edit(scope.row.id)" icon="el-icon-edit"  circle></el-button>
  <el-button type="danger" @click="open(scope.row.id)" icon="el-icon-delete" circle></el-button>
  <el-tooltip content="小伙子开的什么车啊" placement="top">
  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
  </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.queryinfo.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="this.queryinfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>
</el-card>
<el-dialog
@close="closed"
  title="添加用户"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <el-form :model="addForm" :rules="addRules" ref="addFormRef" label-width="70px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
   <el-form-item label="手机号" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
  </el-form>
   
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="toadd()">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="修改用户"
  :visible.sync="dialogVisibleA"
  width="30%"
  @close="editclosed"
  >
  <el-form :model="editForm" :rules="addRules" ref="editFormRef" label-width="70px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="editForm.username" disabled></el-input>
  </el-form-item>
  
   <el-form-item label="手机号" prop="mobile">
    <el-input v-model="editForm.mobile"></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>
  </el-form>
   
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleA = false">取 消</el-button>
    <el-button type="primary" @click="toedit()">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
export default{
    created(){
        this.user()
    },
    
     data() {
       var checkEmail=(rule,value,cb)=>{
         const reg=/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
         if(reg.test(value)){
           return cb()
         }else{
           cb(new Error('邮箱格式不正确'))
         }

       }
       var checkMobile=(rule,value,cb)=>{
         const reg=/^13(\d{9})$|^15(\d{9})$|^189(\d{8})$/;
         if(reg.test(value)){
           return cb()
         }else{
           cb(new Error('手机位数或格式不正确'))
         }
       }
      return {
        editForm:{},
        addForm:{
          username:'',
          password:'',
          mobile:'',
          email:'',
        },
        addRules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ], password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在3到 15 个字符', trigger: 'blur' }
          ], mobile: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
              { validator: checkMobile, trigger: 'blur' }
            // { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
           
          ], email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
            // { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
            
          ],
        },
          dialogVisible: false,
          dialogVisibleA:false,
           value1: false,
        value2: true,
        queryinfo:{
          query:'',
          pagenum:1,
         pagesize:4
        },
        
        tabledata:[],
        total:1,
       id:[],
//         username:'',
// email:'',
// mobile:'',
// role_name:'',
// mg_state:''

      }
    },
    
   
    methods:{
     async edit(s){
         this.dialogVisibleA = true;
const {data:res}=await this.$http.get('users/'+s);
 console.log(res);
this.editForm=res.data
        console.log(s);
        
      },
     async toedit(){
      this.$refs.editFormRef.validate(async valid=>{
         console.log(valid);
         if(valid){
this.dialogVisibleA = false;
        console.log(this.editForm);
        var a=this.editForm.id;
        const {data:res}=await this.$http.put('users/'+a,{email:this.editForm.email,mobile:this.editForm.mobile})
        console.log(res);
        
        if(res.meta.status!==200)
        {return this.$message.error('用户信息修改失败')}
        else{this.user();return this.$message.success('用户信息修改成功')}
         }else{
           this.$message.error('请输入正确信息！')
         }
       })
         
      },
      add(){
        this.dialogVisible = true
      },
       closed(){
         this.$refs.addFormRef.resetFields()
       },editclosed(){
         this.$refs.editFormRef.resetFields()
       },
        async open(id) {
      const result=  await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err);
        if(result!=='confirm'){
          this.$message.info('已经取消删除')
        }else{
           const {data:res}=await this.$http.delete('users/'+id)
        console.log(res);
        
        if(res.meta.status!==200)
        {return this.$message.error(''+res.meta.msg)}
        else{this.user();return this.$message.success('删除成功')}
    
        }
      }
    ,
     
      async toadd(){
         this.$refs.addFormRef.validate(async valid=>{
           if(valid){
        this.dialogVisible = false;
        console.log(this.addForm);
        var a=this.addForm;
        const {data:res}=await this.$http.post('users',a)
        console.log(res);
        
        if(res.meta.status!==201)
        {return this.$message.error('用户信息添加失败')}
        else{this.user();return this.$message.success('用户信息添加成功')}}else{
           this.$message.error('请输入正确信息！')
         }

         })},
      handleSizeChange(newsize){
        this.queryinfo.pagesize=newsize,
         this.user()
      },
      handleCurrentChange(newsize){
        this.queryinfo.pagenum=newsize,
         this.user()
      },
       async change(scope){
            console.log(scope);
        const {data:res}=await this.$http.put(`users/${scope.id}/state/${scope.mg_state}`)
          if(res.meta.status!==200)
          {
            return this.$message.error('用户信息更改失败'+res.meta.msg)
          }else{
            return this.$message.success('用户信息更改成功')
          }
            
        },
       async user(){
const {data:res}=await this.$http.get('users',{params:this.queryinfo});
console.log(res.data);
this.tabledata=res.data.users;
this.id=res.data.users.id;
// this.username=res.data.users.username;
// this.email=res.data.users.email;
// this.mobile=res.data.users.mobile;
// this.role_name=res.data.users.role_name;
// this.mg_state=res.data.users.mg_state+'';
this.total=res.data.total

        }
    }
}
</script>
<style lang="less" scoped>

.box-card{
    margin: 40px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302) !important;
}
#el-switch{
    font-size: 12px;
}
.happy{color:#fff;font-size:12px;width: 100px;height: 24px;
background:-webkit-linear-gradient(left,#54e38e,#41c7af);position: absolute;top: 20px;
    left: 52px;border-radius: 0 20px 0 20px;line-height: 24px;text-align: center}
</style>