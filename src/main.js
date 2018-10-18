// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import { Button, Form, Input, Icon, message, Tag, Card } from 'ant-design-vue';

const { Item: FormItem } = Form;

Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Icon.name, Icon);
Vue.component(Tag.name, Tag);
Vue.component(Card.name, Card);

Vue.prototype.$message = message;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
