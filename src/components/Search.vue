<template >
  <div id="search">
    <div> 请输入垃圾名字&nbsp;&nbsp;&nbsp;&nbsp;<input v-model="rubbish"/>&nbsp;&nbsp;
      <button @click="search">搜索</button>
    </div>
    <div v-if="type !== ''">
      <div>名字：{{ rubbish1 }}</div>
      <div>类型：{{ type === null?"暂无收录":type }}</div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      rubbish: '',
      type: "",
      rubbish1:""
    }
  },
  methods: {
    search() {
      this.$axios.get("/api/search?name=" + this.rubbish)
          .then(res => {
            console.log(res)
            this.type = res.data.data
            this.rubbish1 = this.rubbish
          })
    }
  }
}
</script>

<style scoped>
#search{
  width: 30rem;
  margin-left: 10rem;
}
</style>