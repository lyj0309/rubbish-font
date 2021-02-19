<template>
  <nav v-if="login">
    <div style="margin-left: 90%;display: inline-block">
      {{ user }}
      <button v-on:click="logout">登出</button>
    </div>
  </nav>
  <Recycle v-if="login"></Recycle>
  <Search v-if="login"></Search>
  <welcome v-else></welcome>
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
      login: ""
    }
  },
  beforeMount() {
    function getCookie(a) {
      // console.log(a)
      let d;
      let b = document.cookie;
      // console.log(b)
      let c = b.split(";");
      for (let e = 0; e < c.length; e++) {
        let f = c[e].split("=");
        if (a === f[0].toString().trim()) {
          d = f[1];
          break;
        }
      }
      if (void 0 === d || null == d) {
        return "";
      } else {
        return unescape(d.trim());
      }
    }

    let session = getCookie(`session`)
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
      function getCookie(a) {
        // console.log(a)
        let d;
        let b = document.cookie;
        // console.log(b)
        let c = b.split(";");
        for (let e = 0; e < c.length; e++) {
          let f = c[e].split("=");
          if (a === f[0].toString().trim()) {
            d = f[1];
            break;
          }
        }
        if (void 0 === d || null == d) {
          return "";
        } else {
          return unescape(d.trim());
        }
      }

      let session = getCookie(`session`)
      this.user = session.slice(19,);
    }
  },

}


</script>

<style scoped>

</style>