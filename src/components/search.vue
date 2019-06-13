<template>
<div class="search">
        <div>   
            <mt-header fixed title="搜索">
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
        </div>
        <div style="margin-top:40px;height:56px;">
            <mt-search v-model="value" autofocus :result="filterResult"  @keyup.enter.native="search()" >
            </mt-search>
        </div>
        <mt-button type="default" @click="clear()" style="float:right;margin:20px;">清除历史搜索</mt-button>
</div>
     
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      value: "",
      result: [],
      tourArr: []
    };
  },
  computed: {
    filterResult() {
      if (this.result != null) {
        return this.result.filter(value =>
          new RegExp(this.value, "i").test(value)
        );
      }
    }
  },
  created() {
    this.getSearch();
  },
  methods: {
    search() {
      var tourname = this.value;
      var _this = this;
      _this.addSearch();
      GET(
        urlApi + "app/findTour",
        { name: tourname },
        function(res) {
          if (res.length > 0) {
            var id = res[0].id;
            _this.$router.push({ path: "/detail", query: { id: id } });
          } else {
            _this.$toast({ message: "景点不存在" });
          }
        },
        function(err) {
          console.log(err);
        }
      );
    },
    getSearch() {
      this.result = JSON.parse(localStorage.getItem("search"));
    },
    addSearch() {
      this.tourArr.push(this.value);
      localStorage.setItem("search", JSON.stringify(this.tourArr));
    },
    clear() {
      localStorage.removeItem("search");
      this.$toast({ message: "已清除" });
    }
  }
};
</script>
<style>
.mint-search-list {
  margin-top: 50px;
}
</style>
