<template>
<div>
    <mt-header fixed title="个人中心">
         <router-link to="/personInfo" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div style="margin-top:55px;">
        
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username" class="border"></mt-field>
        <mt-field label="手机号"  v-model="phone" class="border"></mt-field>
        <mt-field label="昵称"  v-model="nickname" class="border"></mt-field>
        <mt-radio 
            title="性别"
            v-model="sex"
            :options="['男', '女']">
        </mt-radio>
        <mt-button type="primary" style="width:100%" @click="update()">修改</mt-button><br>
    </div>
    </div>
</template>

    
<script>
export default {
    name:'personal',
    data(){
        return{
             username:'',
             sex:'女',
             phone:'',
             nickname:''

        }
    },
    created(){
        this.getInfo()
    },
    methods:{
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
                        _this.username = res[0].username;
                        _this.nickname = res[0].nickname ?   res[0].nickname : '用户' + res[0].username;
                        _this.sex = res[0].sex == null ? '男' : res[0].sex ;
                        _this.phone = res[0].phone;
                        console.log(res);
                    } else {
                        _this.$toast({message:'超时请登录'});
                        _this.$router.replace('/login');
                    }
                },function(err){
                    console.log(err);
                }
            )
        },

        // 修改个人信息
        update(){
            if(this.username == '' || this.nickname == '' || this.sex == '' || this.phone == ''){
                this.$toast({message:'请完善信息'});
                return
            }
            var _this = this;
            var user = localStorage.getItem('user');
            POST(
                urlApi + 'app/edit',
                {
                    username:_this.username,
                    nickname:_this.nickname,
                    sex:_this.sex,
                    phone:_this.phone,
                    id:user
                },
                function(res){
                    if(res.res_code == 0){
                         _this.$toast({message:'修改成功'});
                        _this.$router.replace('/');

                    }
                },function(err){
                    console.log(err);
                }
            )

        },
        logout(){
            localStorage.removeItem('user');
             this.$router.replace('/login');
        }
    }
}
</script>
<style>
.border{
    border-bottom:1px solid #ccc;
}
</style>

