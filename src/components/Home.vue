<template>
    <div class="index">
        <div class="header">
            <Header />
        </div>
        <div class="swiper">
          <Swiper v-bind:swiper="swiper" />
          <!-- <mt-swipe-item><img src="../assets/1.jpg" /></mt-swipe-item> -->
        </div>
        <div class="icon">
           <Icon />
        </div>
         <div class="list">
             <list />
        </div>
    </div>
</template>
<script>
import Header from "./Header";
import Icon from "./Icon";
import List from "./List";
import Swiper from "./Swiper";
export default {
  name: "Index",
  data() {
    return {
      value: "",
      status: false,
      swiper:[{'url':require("../assets/1.jpg")},{'url':require("../assets/2.jpg")},{'url':require("../assets/3.jpg")}]
    };
  },
  components: {
    Header,
    Icon,
    List,
    Swiper
  }
};
</script>

<style>
.mint-swipe-items-wrap {
  overflow: visible;
}
.index {
  padding: 0 auto;
  width: 100%;
  height: 100%;
}
.swiper {
  height: 160px;
}
.mint-swipe {
  height: 160px;
}
.swiper img {
  width: 100%;
  height: 160px;
}

.list {
  height: auto;
}

.item {
  line-height: 50px;
  height: 50px;
  border: 1px solid #000;
}
</style>

