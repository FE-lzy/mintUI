<template>
    <div class="forget">
      <mt-header fixed title="找回密码">
         <router-link to="/login" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div style="margin-top:55px;">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username" class="border"></mt-field>
        <mt-field label="手机号" type="number" placeholder="请输入手机号" v-model="phone" class="border"></mt-field>
        
        <mt-button type="primary" style="width:100%;margin-top:20px;" @click="submitForm()">下一步</mt-button>
         <p style="text-align:center;margin:20px;"> <span style="text-decoration:underline" @click="login()">登录</span> &nbsp;&nbsp;<span style="text-decoration:underline" @click="forget()">忘记密码</span> </p>
    </div>
    </div>
    </div>
</template>
<script>
export default {
  name: "Login",
  mounted: function() {},
  data() {
    return {
      username: "",
      phone:'',
      password: ""
    };
  },
  methods: {
    
    submitForm() {
      console.log(this.username);
      console.log(this.password);
      console.log(this.phone);
      if(this.username == '' || this.phone == '' ){
        this.$toast({message:'请完善内容'});
        return;
      }

      if(this.phone.length != 11){
        this.$toast({message:'手机号不正确'});
        return;
      }
      var _this = this;
   
        POST(
          urlApi + 'app/findPerson',
          {
            username:this.username,
            phone:this.phone,
          },
          function(res){
            if(res.length > 0){
              var id = res[0].id;
              _this.$router.push({path:"/updatePwd", query: { id : id } });
            } else {
              _this.$toast({message:'用户不存在'});
            }
          },function(err){
            console.log(err);
            
          }
        )
      
    },
    login(){
      this.$router.replace('/Login');
    },
    forget(){
      this.$router.replace('/forget');
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
