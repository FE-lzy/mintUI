<template>
    <div class="reg">
      <mt-header fixed title="注册">
         <router-link to="/login" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div style="margin-top:55px;">
        <mt-field label="密码" type="password" placeholder="请输入密码" v-model="password" class="border"></mt-field>
        <mt-field label="确认密码" type="password" placeholder="请输入密码" v-model="repassword" class="border"></mt-field>
        <mt-button type="primary" style="width:100%;margin-top:20px;" @click="submitForm()">确认修改</mt-button>
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
      password: "",
      repassword:''
    };
  },
  methods: {
    
    submitForm() {
    
      if(this.repassword != this.password ){
        this.$toast({message:'两次密码不一致'});
        return;
      }
      var _this = this;
      var id = this.$route.query.id;

      if(id == null){
          this.$router.replace('/login');
          return;
        }
        
        POST(
          urlApi + 'app/updatePwd',
          {
            password:this.password,
            id:id
          },
          function(res){
            if(res.res_code == 0){
              _this.$toast({message:'修改成功'});
              _this.$router.replace('/login')
            } else {
              _this.$toast({message:'修改失败'});
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
