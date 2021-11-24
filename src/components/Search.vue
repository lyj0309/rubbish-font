<template>
  <div id="search">
    <div style="display: flex;justify-content: center;align-items: center">
      <div style="width: 15rem;font-size: 18px;margin-right: 0.5rem">请输入垃圾名字:</div>
      <el-input v-model="rubbish"/>&nbsp;&nbsp;
      <el-button @click="search">搜索</el-button>
    </div>
    <div v-if="type !== ''">
      <div style="font-size: 18px;margin: 0.5rem">名字：{{ rubbish }}</div>
      <div style="font-size: 18px;margin: 0.5rem">类型：{{ type === null ? "暂无收录" : type }}</div>
      <div>详情：{{ content }}</div>
    </div>
  </div>

</template>

<script>
import {ElMessage} from 'element-plus'
export default {
  name: "Search",
  data() {
    return {
      rubbish: '',
      type: "",
      content:""
    }
  },
  methods: {
    search() {
      this.$axios.get("/api/search?name=" + this.rubbish)
          .then(res => {
            if (res.data.data.ID === 0) {
              ElMessage("暂无收录")
            }
            console.log(res)
            this.type = res.data.data.Fname
            this.rubbish = res.data.data.Name
            this.content = res.data.data.Content
          })
    }
  }
}
</script>

<style scoped>
#search {
  width: 30rem;
  margin-left: 10rem;
}
</style>