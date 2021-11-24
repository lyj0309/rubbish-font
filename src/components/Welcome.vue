<template>
  <div style="            display: flex;
            justify-content: center;
            align-items: center;
height: 100vh">
    <div class="login">
      <div>
        <div style="margin-bottom: 2rem;font-size: 3rem">垃圾分类回收系统</div>
        <div>
          登录/注册
        </div>
        <br>
        <div class="input">
          <div class="txt">用户类型：</div>
          <el-select v-model="type" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="input">
          <div class="txt">用户名：</div>
          <el-input v-model="user"/>
        </div>
        <div class="input">
          <div class="txt">密码：</div>
          <el-input type="password" v-model="pwd"/>
        </div>
        <el-button v-on:click="login">登录</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button v-on:click="register">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from 'element-plus'

export default {
  name: "Welcome",
  data() {
    return {
      user: "",
      pwd: "",
      options: [{
        value: '居民',
        label: '居民'
      }, {
        value: '回收机构',
        label: '回收机构'
      }, {
        value: '小区管理员',
        label: '小区管理员'
      }],
      type: ''
    }
  },
  methods: {   //定义方法对象
    register: function () {
      if (this.user === '' || this.pwd === '') {
        ElMessage(`请填好数据`)
        return
      }
      if (this.type === "回收机构"){
        this.$prompt('请输入联系方式（手机）', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$axios.post("/api/register", {
            user: this.user,
            pwd: this.pwd,
            type: this.type,
            phone:value
          })
              .then(res => {
                console.log(res)
                ElMessage(res.data.data)
              })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }else {
        this.$axios.post("/api/register", {
          user: this.user,
          pwd: this.pwd,
          type: this.type,
          phone:""
        })
            .then(res => {
              console.log(res)
              ElMessage(res.data.data)
            })
      }
    },
    login: function () {

      this.$axios.post("/api/login", {
        user: this.user,
        pwd: this.pwd,
      })
          .then(res => {
            console.log(res)
            ElMessage(res.data.data)
            if (res.data.data === '登录成功') this.$parent.loginm()

          })
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(20px);
  height: 30rem;
  width: 35rem;
  border-radius: 2rem;

}

.login > input, div {
  text-align: center;
}

.input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19rem;
  margin: 1rem;
}

.input > .txt {
  width: 10rem;

}

</style>