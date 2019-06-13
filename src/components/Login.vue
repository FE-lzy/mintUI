<template>
    <div class="Login">
    <mt-header fixed title="登录">
         <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div style="margin-top:55px;">
        
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username" class="border"></mt-field>
        <mt-field label="密码" type="password" placeholder="请输入密码" v-model="password" class="border"></mt-field>
        <mt-button type="primary" style="width:100%;margin-top:20px;" @click="submitForm()">登录</mt-button><br>
        <p style="text-align:center;margin:20px;"> <span style="text-decoration:underline" @click="reg()">注册</span> &nbsp;&nbsp;<span style="text-decoration:underline" @click="forget()">忘记密码</span> </p>
    </div>
    </div>
    </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      
        username: "",
        password: "",
      
    };
  },
  methods: {
   
    submitForm() {
      var _this = this;
      console.log(
        this.username 
      );
      if(this.username == '' || this.password == ''){
        this.$toast({message:'用户名或密码不能为空'});
        return;
      }
      
        POST(
        
          urlApi + 'app/login',
          {
            username:this.username,
            password:this.password
          },
          function(res){
            console.log(res);
            if(res.length >0){
              _this.$toast({message:'登录成功'})
              _this.$router.replace('/');
              localStorage.setItem('user',res[0].id);
            } else {
              _this.$toast({message:'用户名或密码错误'})
            }
            console.log(res);
          },function(err){
            console.log(err);
            
          }
        )
        
      
    },
    resetForm() {
      this.loginParam.nameError = "";
      this.loginParam.passwordError = "";
    },
    reg(){
      this.$router.replace('/reg');
    },
    forget(){
      this.$router.replace('/forget');
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.border{
    border-bottom:1px solid #ccc;
}
.Login {
  width: 100%;
  height: 100%;
  /* background: url("../assets/login.jpg") no-repeat; */
  /* background-size: 100% 100%; */
}
.Login .form {
  width: 350px;
  border: 1px solid #ededed;
  padding: 0px 25px 25px 25px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.Login .title {
  height: 60px;
  margin-bottom: 40px;
  text-align: center;
  box-sizing: border-box;
  color:#333;
}
.Login .title p {
  height: 100%;
  font-size: 2rem;
  line-height: 60px;
  letter-spacing: 2px;
}
.Login label.el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.loginbtn {
  width: 100%;
  /* background-color:#7fa099; */
  color: #7fa099;
}

</style>
