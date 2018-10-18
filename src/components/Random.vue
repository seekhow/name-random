<template>
  <div class="container">
    <div class="right">
      <div class="title">Random Time</div>
      <div class="form">
        <a-input
          placeholder='回车添加'
          @pressEnter="pressEnter"
          v-model="id"
          class="item-input"
        >
          <a-icon slot="prefix" type='plus-circle-o' style="color:rgba(0,0,0,.25)"/>
          <a-icon @click="init" slot="suffix" type='close-circle-o' style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <a-input
          type="number"
          placeholder='抽取数'
          @pressEnter="buttonClick"
          v-model="num"
          class="num-input"
        >
          <a-icon class="num-input-icon" slot="prefix" type='aliyun' style="color:rgba(0,0,0,.25)"/>
        </a-input>
        <div class="tags">
          <a-tag
            class="tag"
            :color="colorShow(item)"
            v-for="(item, index) in list"
            :key="index"
            closable
            @close="closeTag(item, index)"
          >
            {{ item }}
          </a-tag>
        </div>
        <div class="text">
          <div class="tag-num-text" v-if="list.length">共{{ list.length }}个选择项</div>
          <div class="time-text" v-if="date">{{ date }}</div>
        </div>
        <a-button
          class="submit-button"
          type='primary'
          @click="buttonClick"
        >
          Random
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
Date.prototype.Format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "H+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
function shuffle(array) {
  let m = array.length;
  let t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
export default {
  name: 'Random',
  data () {
    return {
      id: '',
      num: null,
      list: [],
      picks: [],
      date: ''
    }
  },
  mounted() {
    let data;
    data = localStorage.getItem('data')
    try {
      data = JSON.parse(data);
    } catch (error) {
    }
    if (data 
    && typeof data == "object"
    && data.num
    && data.list
    && data.picks
    && data.date
    ) {
      this.num = data.num;
      this.list = data.list;
      this.picks = data.picks;
      this.date = data.date;
    }
  },
  methods: {
    buttonClick() {
      if (this.picks.length) {
        this.picks = [];
      }
      if (!this.num) return;
      if (this.num > this.list.length) return;
      this.picks = shuffle(JSON.parse(JSON.stringify(this.list))).slice(0, this.num);
      this.date = new Date().Format("yyyy-MM-dd HH:mm:ss");
      localStorage.setItem('data', JSON.stringify({
        num: this.num,
        list: this.list,
        picks: this.picks,
        date: this.date
      }));
    },
    pressEnter() {
      if (this.picks.length) {
        this.picks = [];
        this.date = '';
      };
      if (!this.id) return;
      if (this.list.includes(this.id)) return;
      this.list.push(this.id);
      this.id = '';
    },
    colorRandom(index) {
      const colors = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple' ];
      return colors[index % 7];
    },
    closeTag(item, index) {
      this.list.splice(index, 1, 0);
    },
    colorShow(item) {
      return this.picks.includes(item) ? 'red' : '';
    },
    init() {
      this.id = '';
      this.num = null;
      this.list = [];
      this.picks = [];
      this.date = '';
      localStorage.setItem('data', JSON.stringify({
        num: null,
        list: [],
        picks: [],
        date: ''
      }));
    }
  }
}
</script>
<style>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
}
.title {
  font-size: 22px;
  margin-top: -20px;
  margin-bottom: 20px;
  color: #5e8fe6;
}
.form {
  width: 350px;
}
.num-input {
  margin-top: 10px;
}
.num-input-icon {
  margin-top: 10px;
}
.submit-button {
  margin-top: 10px;
  width: 100%;
}
.tags {
  margin-top: 10px;
  border: 1px #fff solid;
}
.tag {
  margin: 3px;
}
.text {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.tag-num-text {
  margin-right: 5px;
}
.time-text {
  margin-left: 5px;
}
</style>
