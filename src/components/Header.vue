<template>
<div class="header">
    <div class="header_left" @click="jumpLogin()">
        <img src="../assets/user.png" />
    </div>
    <div class="header_center">
        <input class="seacch" type="text" @click="jumpSearch()" value="搜索" />
    </div>
    <div class="header_right">
        <div class="address" @click="jumpCity()" >{{ selectCity }}  </div> 
    </div>
</div>
            
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      value: "",
      selectCity: ""
    };
  },
  created() {
    this.judgeLogin();
    this.getCity();
  },
  methods: {
    jumpSearch() {
      console.log("搜索");
      this.$router.replace("/search");
    },
    jumpCity() {
      this.$router.replace("/city");
    },

    judgeLogin() {
      console.log(localStorage.getItem("user"));
      this.status = localStorage.getItem("user") ? true : false;
    },
    jumpLogin() {
      console.log(this.status);
      if (this.status) {
        this.$router.replace("/personInfo");
      } else {
        // 不在线
        this.$router.replace("/login");
      }
    },
    getCity() {
      console.log(localStorage.getItem("selectCity"));
      this.selectCity =
        localStorage.getItem("selectCity") != null
          ? localStorage.getItem("selectCity")
          : "北京";
    }
  }
};
</script>
<style>
.header {
  height: 55px;
  background: #26a2ff;
}
.seacch {
  height: 35px;
  border-radius: 10px;
  width: 93%;
  border: 0px;
  line-height: 45px;
  vertical-align: sub;
  padding-left: 10px;
}
.header_left {
  width: 15%;
  height: 100%;
  float: left;
}
.header_left img {
  height: 35px;
  line-height: 35px;
  margin-top: 13px;
  margin-left: 15%;
  text-align: center;
}
.header_center {
  height: 55px;
  width: 70%;
  height: 100%;
  line-height: 50px;
  float: left;
}
.mint-searchbar {
  /* background: #1FBCD2; */
  height: 55px;
}
.mint-searchbar-cancel {
  color: #fff;
}
.header_right {
  /* background: greenyellow; */
  width: 15%;
  height: 100%;
  float: left;
}
.address {
  line-height: 60px;
  color: #fff;
}
</style>

