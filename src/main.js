import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from'./router.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'whatwg-fetch';
import "./plugins/fetch";
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import { Header,Search,IndexList, IndexSection,Field,Radio,Button ,CellSwipe   } from 'mint-ui';

Vue.use(Mint);
Vue.use(ElementUI);

Vue.component(Header.name, Header);
Vue.component(Search.name, Search);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Field.name, Field, );
Vue.component(Radio.name, Radio);
Vue.component(Button.name, Button);
Vue.component(CellSwipe.name, CellSwipe);
Vue.config.productionTip = false
window.urlApi="http://192.168.1.122:3000/";
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
