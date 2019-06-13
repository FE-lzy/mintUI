<template>
    <div class="personInfo">
        <mt-header fixed title="个人中心">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div style="margin-top:50px;">
            <div>
                <div class="listItemInfo">
                     <div class="leftImgInfo">
                        <img src= "../assets/user2.png" style="border-radius:100%">    
                     </div>
                     <div class="rightContentInfo">
                         <div class="name">
                            昵称：{{ nickname }}
                         </div>
                     </div>
                 </div>     
            </div>
            <div style="clear:both">
                <mt-cell
                    title="修改个人信息"
                    to="/personal"
                    is-link
                    value="">
                </mt-cell>
                 <p style="text-align:center;margin:20px;"> <span style="text-decoration:underline" @click="logout()">退出登录</span> </p>
            </div>
            
        
       
        </div> 
        
    </div>
</template>

<script>
export default {
    name:'personInfo',
    data(){
        return{
            nickname:''    
        }
    },
    created(){
        this.getInfo()
    },
    methods:{
        logout(){
            localStorage.removeItem('user');
             this.$router.replace('/login');
        },
        // 获取个人信息
        getInfo(){
            var user = localStorage.getItem('user');
            if(!user){
                this.$router.replace('/login');
                return;
            }
            // console.log(user);
            var _this = this;
            GET(
                urlApi + 'app/getInfo',
                {
                    id:user
                },
                function(res){
                    if(res.length > 0){
                        _this.nickname = res[0].nickname  ?   res[0].nickname : '用户' + res[0].username;
                    } else {
                        _this.$toast({message:'超时请登录'});
                        _this.$router.replace('/login');
                    }
                },function(err){
                    console.log(err);
                }
            )
        },
    }
}
</script>

<style>
.listItemInfo {
  margin-top: 5px;
  line-height: 80px;
  clear: both;
  
}
.leftImgInfo {
  height: 100%;
  width: 20%;
  float: left;
  line-height: 80px;
}
.leftImgInfo img {
  margin-left: 10px;
  width: 60px;
  height: 60px;
}
.rightContentInfo {
  height: 100%;
  width: 65%;
  padding-left: 20px;
  float: left;
  text-align: left;
  line-height: 35px;
}
.name {
  font-size: 16px;
  color: #909090;
  display: block;
}
</style>
