<template>
  <div v-if="type !== '居民'" style="display: flex">
    <div>
      <h3 v-if="rec.length !==0">回收信息列表</h3>
      <div style="width: 20rem;margin-bottom: 2rem" v-for="r in rec">
        发布者： {{ r.CUser }} <br>
        地点：{{ r.Place }} <br>
        发布时间：{{ r.Time.substr(0, r.Time.length - 9) }} <br>
        备注：{{ r.Info }} <br>
        <div v-if="r.RUser">回收者：{{ r.RUser }}</div>
        <div v-if="r.RPhone">回收者联系方式：{{ r.RPhone }}</div>
        <el-button v-if="user === r.CUser" @click="deletethis(r.Id)">删除</el-button>
        <el-button v-if=" type!=='小区管理员' && !r.RUser" @click="recycle(r.Id)">回收</el-button>
      </div>
    </div>
    <div v-if="type==='小区管理员'">
      <h3>发布回收信息</h3>
      <br>
      <div class="input">
        <div style="width: 5rem"> 地点：</div>
        <el-input v-model="place"/>
        <br>
      </div>
      <div class="input">
        <div style="width: 5rem"> 备注：</div>
        <el-input v-model="info"/>
        <br>
      </div>
      <el-button @click="upRecycle">发布</el-button>
    </div>
  </div>
  <div v-else>
    <h1>    居民不支持此功能
    </h1>
  </div>
</template>

<script>
import {ElMessage} from 'element-plus'

export default {
  name: "Recycle",
  data() {
    return {
      rec: [],
      place: "",
      info: ""
    }
  },
  props: {
    user: String,
    type: String,
  },
  beforeMount() {
    this.$axios.get("/api/recycle")
        .then(res => {
          console.log(res.data.data)
          this.rec = res.data.data
        })
  },
  methods: {
    refresh() {
      this.$axios.get("/api/recycle")
          .then(res => {
            console.log(res.data.data)
            this.rec = res.data.data
          })
    },
    upRecycle() {
      if (this.place === '' || this.info === '') {
        ElMessage(`请填好`);
        return
      }
      this.$axios.post("/api/recycle", {
        place: this.place,
        info: this.info
      })
          .then(res => {
            console.log(res)
            ElMessage(res.data.data)
            this.refresh()
          })
    },
    deletethis(id) {
      this.$axios.delete("/api/recycle?id=" + id)
          .then(res => {
            console.log(res)
            ElMessage(res.data.data)
            this.refresh()
          })
    },
    recycle(id) {
      this.$axios.put("/api/recycle?id=" + id)
          .then(res => {
            console.log(res)
            ElMessage(res.data.data)
            this.refresh()
          })
    }
  }
}
</script>

<style scoped>
.input {
  font-size: 18px;
  display: flex;
  width: 200px;
  align-items: center;
  margin: 1rem;
}
</style>