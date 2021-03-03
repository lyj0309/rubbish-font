<template>

  <div class="login">
    <div>
      <div style="margin-bottom: 2rem;font-size: 3rem">垃圾分类回收系统</div>
      <div>
        登录/注册
      </div>
      <br>
      用户类型：
      <select v-model="type">
        <option value="居民">居民</option>
        <option value="回收机构">回收机构</option>
      </select>
      <br><br>
      用户名：<input v-model="user"/>
      <br><br>
      密码：<input type="password" v-model="pwd"/>
      <br><br>
      <button v-on:click="login">登录</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button v-on:click="register">注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      user: "",
      pwd: "",
      type: "居民"
    }
  },
  methods: {   //定义方法对象
    register: function () {
      if (this.user === '' || this.pwd === '') {
        alert(`请填好数据`)
        return
      }
      this.$axios.post("/api/register", {
        user: this.user,
        pwd: this.pwd,
        type: this.type
      })
          .then(res => {
            console.log(res)
            alert(res.data.data)
          })
    },
    login: function () {
      if (this.user === '' || this.pwd === '') {
        alert(`请填好数据`)
        return
      }
      this.$axios.post("/api/login", {
        user: this.user,
        pwd: this.pwd,
      })
          .then(res => {
            console.log(res)
            alert(res.data.data)
            if (res.data.data === '登录成功') this.$parent.loginm()

          })
    }
  }
}
</script>

<style scoped>
.login {
  margin-top: 12rem;
  display: flex;
  justify-content: center;
}

.login > input, div {
  text-align: center;
}
</style>