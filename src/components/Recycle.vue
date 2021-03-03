<template>
  <div style="display: flex">
    <div>
      <h3>回收信息列表</h3>
      <div style="width: 20rem;margin-bottom: 2rem" v-for="r in rec">
        发布者： {{ r.CUser }} <br>
        地点：{{ r.Place }} <br>
        发布时间：{{ r.Time.substr(0, r.Time.length - 9) }} <br>
        备注：{{ r.Info }} <br>
        <div v-if="r.RUser">回收者：{{ r.RUser }}</div>
        <button v-if="user === r.CUser" @click="deletethis(r.Id)">删除</button>
        <button v-if="type!=='居民' && !r.RUser" @click="recycle(r.Id)">回收</button>
      </div>
    </div>
    <div v-if="type==='居民'">
      <h3>发布回收信息</h3>
       <br>
      地点：<input v-model="place"/><br>
      备注：<input v-model="info"/><br>
      <button @click="upRecycle">发布</button>
    </div>
  </div>
</template>

<script>
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
        alert(`请填好`);
        return
      }
      this.$axios.post("/api/recycle", {
        place: this.place,
        info: this.info
      })
          .then(res => {
            console.log(res)
            alert(res.data.data)
            this.refresh()
          })
    },
    deletethis(id) {
      this.$axios.delete("/api/recycle?id=" + id)
          .then(res => {
            console.log(res)
            alert(res.data.data)
            this.refresh()
          })
    },
    recycle(id){
      this.$axios.put("/api/recycle?id=" + id)
          .then(res => {
            console.log(res)
            alert(res.data.data)
            this.refresh()
          })
    }
  }
}
</script>

<style scoped>

</style>