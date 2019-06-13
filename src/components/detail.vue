<template>
    <div>
        <mt-header fixed title="详情">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="swiper">
            <Swiper v-bind:swiper = 'swiper'  />
        </div>

        <div class="intro">
            <!-- {{data.intro}} -->
            <div class="apart" v-if="showMore">
                {{ data.intro.substring(0,100)}} 
                <span class="showMore" @click="showIntro()">显示更多</span>
            </div>
            <div v-else>
              {{ data.intro }}
              <span class="showMore" @click="showIntro()">收起</span>
            </div>

                       
        </div>
        <div>
          <p style="background:#eee;margin:5px;">路线</p>
                 <div id="allmap"></div>
        </div>
        <div class="commentList">
                <div class="listItemDetail" v-for="item in commentArr">
                     <div class="leftImgDetail">
                        <img src= "../assets/user2.png" style="border-radius:100%">    
                     </div>
                     <div class="rightContentDetail">
                         <div class="name">
                             {{ item.nickname == null ? '用户'+ item.username : item.nickname }}
                         </div>
                         <div class="descDetail">
                             {{ item.comment}} 
                         </div>
                        
                     </div>
                 </div>
                 
                 <div class="comment">
                     <textarea style="width:90%;text-align:left;padding:3px;margin:3%;border-radius:10px;" rows=4 
                        placeholder="发表您的评论" v-model="comment"
                     />
                     <mt-button size="normal" type="primary" style="width:80%;margin-left:10%" @click="publish()">发表</mt-button>

                 </div>
        </div>
    </div>
</template>

<script>
import Swiper from "./Swiper";
export default {
  name: "detail",
  data() {
    return {
      data: [],
      comment: "",
      swiper: [],
      commentArr: [],
      jd:'',
      wd:'',
      city:'',
      showMore:false,

    };
  },
  components: {
    Swiper
  },
  created() {
    this.getDetail();
    this.getComment();
  },
  mounted(){
    this.getBaiduApi();
  },
  methods: {
    showIntro(){
      console.log(123);
      this.showMore = !this.showMore;
    },
    getComment() {
      console.log(1);
      var id = this.$route.query.id;
      var _this = this;
      GET(
        urlApi + "app/selectComment",
        {
          tid: id
        },
        function(res) {
          if (res.length != 0) {
            _this.commentArr = res;
          }
        },
        function(err) {
          console.log(err);
        }
      );
    },
    getBaiduApi(){
      if (this.$route.query.id == "") {
        this.$router.push("/");
      }
      var id = this.$route.query.id;
      var _this = this;
      GET(
        urlApi + "app/getTourDetail",
        { id: id },
        function(res) {
          if (res.length != 0) {
            _this.data = res[0];
            _this.jd = res[0].line.split(',')[0];
            _this.wd = res[0].line.split(',')[1];
            _this.city = res[0].name;
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(_this.jd,_this.wd);
            map.centerAndZoom(point,11);
            // 设置定位marker
            var marker = new BMap.Marker(new BMap.Point(_this.jd,_this.wd));
            map.addOverlay(marker);

          var opts = {
              position : point,    // 指定文本标注所在的地理位置
              offset   : new BMap.Size(-20, -65)    //设置文本偏移量
            }
            var label = new BMap.Label(_this.city, opts);  // 创建文本标注对象
              label.setStyle({
                color : "#fff",
                fontSize : "14px",
                height : "20px",
                lineHeight : "20px",
                fontFamily:"微软雅黑",
                padding:"8px",
                background:"green",
                borderColor:"#F8f8f8",
              });
            map.addOverlay(label);
            
          } else {
            this.$router.push("/");
          }
        },
        function(err) {
          console.log(err);
        }
      );
      

    },
    handleSwiper(imgs) {
      for (var i = 0; i < imgs.length; i++) {
        this.swiper.push({ url: imgs[i].url });
      }
      console.log(this.swiper);
    },
    getDetail() {
      console.log(2);
      if (this.$route.query.id == "") {
        this.$router.push("/");
      }
      var id = this.$route.query.id;
      var _this = this;
      GET(
        urlApi + "app/getTourDetail",
        { id: id },
        function(res) {
          if (res.length != 0) {
            _this.data = res[0];
            var reg = /[\u4e00-\u9fa5]/g;
            var strlength = _this.data.intro.match(reg).length;
            if(strlength > 5){
              _this.showMore = true;
            }
            _this.handleSwiper(JSON.parse(res[0].img));
          } else {
            this.$router.push("/");
          }
        },
        function(err) {
          console.log(err);
        }
      );
    },
    publish() {
      var comment = this.comment;
      if (comment == "") {
        this.$toast({ message: "请输入评论" });
        return;
      }
      console.log(localStorage.getItem("user"));
      if (!localStorage.getItem("user")) {
        this.$router.replace("/login");
        this.$toast({ message: "请先登录" });
        return;
      }
      var _this = this;
      POST(
        urlApi + "app/addComment",
        {
          uid: localStorage.getItem("user"),
          tid: _this.$route.query.id,
          comment: comment,
          createtime: Date.parse(new Date())
        },
        function(res) {
          if (res.res_code == 0) {
            _this.$toast({ message: "发表成功" });
            _this.comment = "";
            _this.getComment();
          }
        },
        function(err) {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style>
* {
  padding: 0 auto;
  margin: 0 auto;
}
.swiperDetail {
  height: 160px;
}
.swiperDetail img {
  width: 100%;
  height: 160px;
}
.intro {
  padding: 10px;
  /* height: 100px; */
  overflow: hidden;
}
#allmap{
  height:200px;
  width: 100%;
}

.list {
  height: auto;
}
.sellWell {
  width: 100%;
  height: 30px;
  background: #eee;
  color: #808080;
  text-align: left;
  line-height: 30px;
}
.listBlock {
  width: 100%;
}
.listItemDetail {
  margin-top: 5px;
  line-height: 80px;
  clear: both;
}
.leftImgDetail {
  height: 100%;
  width: 20%;
  float: left;
  line-height: 80px;
}
.leftImgDetail img {
  margin-left: 10px;
  width: 60px;
  height: 60px;
}
.rightContentDetail {
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
.descDetail {
  font-size: 14px;
  color: #ccc;
  display: block;
  overflow: hidden;
}
.showMore{
  color:red;
  text-decoration: underline;
}
</style>


