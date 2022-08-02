import Vue from 'vue';
import App from './App.vue';
import router from '@/router/router';
import store from '@/store/index';

Vue.config.productionTip = false;

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { defineAbility } from '@casl/ability';
import { Can, abilitiesPlugin } from '@casl/vue';

const ability = defineAbility((can) => {
  can('read', 'all');
});

Vue.use(abilitiesPlugin, ability);
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Can', Can);

// install rules
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
