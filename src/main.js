// import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown,faCaretUp,faCaretLeft,faCaretRight,faMagnifyingGlass,faCalendar,faLocationDot,faCheck,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

library.add(faCaretDown,faCaretUp,faCaretLeft,faCaretRight,faMagnifyingGlass,faCalendar,faLocationDot,faCheck,faCircleExclamation)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
