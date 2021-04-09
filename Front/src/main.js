import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAnime from 'vue-animejs';

Vue.config.productionTip = false

new Vue({
  vuetify,
  VueAnime,
  render: h => h(App)
}).$mount('#app')
