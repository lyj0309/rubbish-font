<template>
  <nav v-if="login">
    <div style="margin-left: 75%;display: inline-block">
      用户类型：{{ type }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户名：{{ user }}
      <button v-on:click="logout">登出</button>
    </div>
  </nav>
  <div v-if="login">
    <button @click="sw(0)">搜索垃圾</button>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <button @click="sw(1)">回收信息</button>
  </div>
  <Search v-if="login && id===0"></Search>
  <Recycle :user="user" :type="type" v-if="login && id===1"></Recycle>
  <welcome v-if="!login"></welcome>
</template>

<script>
import Recycle from "./components/Recycle";
import Search from "./components/Search";
import Welcome from "./components/Welcome";

export default {
  name: "Main",
  components: {Welcome, Search, Recycle},
  data() {
    return {
      user: "",
      login: "",
      type:"",
      id:0
    }
  },

  beforeMount() {
    this.type = this.$getCookie(`type`)
    console.log(this.type)
    let session = this.$getCookie(`session`)
    this.login = session !== '';
    this.user = session.slice(19,);
    console.log(this.login)
  },
  methods: {
    logout: function () {
      function setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
      }

      console.log(document.cookie)
      setCookie("session", "", -1);
      this.login = false
    },
    loginm: function () {
      this.login = true
      let session = this.$getCookie(`session`)
      this.user = session.slice(19,);
      this.type = this.$getCookie(`type`)
    },
    sw(id){
      this.id = id
    }
  },

}


</script>

<style scoped>

</style>