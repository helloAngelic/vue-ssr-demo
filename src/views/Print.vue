<template>
  <div>
    <button class="btn" @click="toHtml">打印html</button>
    <el-table :data="tableData" style="width:100%">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="内容" prop="body"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    // const { data } = await axios.get("http://jsonplaceholder.typicode.com/posts");
    const result = store.dispatch("app/setBbb");
    return result;
    // return { tableData: data };
  },
  name: "Print",
  computed: {
    tableData() {
      return this.$store.state.app.bbb;
    },
  },
  methods:{
    toHtml() {
      console.log(document.body.innerHTML);
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  color: red;
}
</style>
