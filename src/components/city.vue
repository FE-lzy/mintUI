<template>
  <div class="city">
    <div>
      <mt-header fixed title="选择城市">
         <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <div style="margin-top:40px;height:56px;">
        <mt-search v-model="cityName" autofocus :result="filterResult"  @keyup.enter.native="search()" >
            
        </mt-search>
    </div>
      <div class="localbox">
        <p>当前城市</p><br>
        <span class="local">
          {{ localCity }}
        </span>
      </div>
      <div class="localbox">
        <p>选择城市</p><br>
        <span class="local">
          {{ selectNow }}
        </span>
      </div>
    </div>
    <div>
      <mt-index-list>
          <mt-index-section :index="item.title" v-for="item in cityArr">
              <mt-cell :title="i" v-for="i in item.lists" @click.native="selectedCity(i)"></mt-cell>
          </mt-index-section>
          
      </mt-index-list>
    </div>
    
  </div>
</template>

<script>
import cityData from "../assets/city.json";
export default {
  name: "city",
  data() {
    return {
      cityName: "",
      cityArr: [],
      selectNow: "无",
      cityDataA: [],
      result: [],
      localCity: ""
    };
  },
  created() {
    this.getSelectedCity();
    this.getCity(cityData);
    this.getCityA();
    this.getLocalCity();
  },
  computed: {
    filterResult() {
      return this.cityDataA.filter(value =>
        new RegExp(this.cityName, "i").test(value)
      );
    }
  },
  methods: {
    getSelectedCity() {
      this.selectNow =
        localStorage.getItem("selectCity") != null
          ? localStorage.getItem("selectCity")
          : "无";
    },
    getCity(cityData) {
      // 读取json文件
      this.cityArr = cityData.city;
      // console.log(localStorage.getItem('selectCity'));
    },
    selectedCity(i) {
      this.selectNow = i;
      this.$toast({ message: "当前选择城市为:" + i });

      localStorage.setItem("selectCity", i);
    },
    getCityA() {
      for (var i = 0; i < this.cityArr.length; i++) {
        for (var j = 0; j < this.cityArr[i].lists.length; j++) {
          this.cityDataA.push(this.cityArr[i].lists[j]);
        }
      }
    },
    search() {
      var d = this.cityDataA.indexOf(this.cityName);
      if (d < 0) {
        this.$toast({ message: "没有该城市" });
      } else {
        this.$toast({ message: "当前选择城市为:" + this.cityName });
        this.selectNow = this.cityName;
        localStorage.setItem("selectCity", this.cityName);
      }
    },
    getLocalCity() {
      var cityName = "";
      var _this = this;
      function myFun(result) {
        cityName = result.name;
        _this.localCity = cityName;
        localStorage.setItem("localCity", cityName);
      }

      var myCity = new BMap.LocalCity();
      myCity.get(myFun);
    }
  }
};
</script>
<style>
.mint-search-list {
  margin-top: 50px;
}
.local {
  border: 1px solid rgb(204, 204, 204);
  font-size: 18px;
  padding: 10px;
  background: #eee;
}
.localbox {
  margin: 10px;
  z-index: 0;
  height: 80px;
}
.mint-cell {
  border-bottom: 1px solid #eee;
}
</style>
