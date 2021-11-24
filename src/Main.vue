<template>
  <div v-if="login" class="b">
    <nav >
      <div style="margin-left: 75%;display: inline-block">
        用户类型：{{ type }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户名：{{ user }}
        <el-button v-on:click="logout">登出</el-button>
      </div>
    </nav>
    <div>
      <el-tabs v-model="id" @tab-click="handleClick">
        <el-tab-pane label="搜索垃圾" name="one">搜索垃圾</el-tab-pane>
        <el-tab-pane label="回收信息" name="two">回收信息</el-tab-pane>
      </el-tabs>
    </div>
    <Search v-if=" id==='one'"></Search>
    <Recycle :user="user" :type="type" v-if="id !=='one'"></Recycle>
  </div>
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
      type: "",
      id: "one",
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
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.id)

    },
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

  },

}


</script>

<style scoped>
.b{
  padding: 2rem;
}
</style>