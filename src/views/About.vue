<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="saveData">保存</button>
    <button @click="getData">弹框</button>
  </div>
</template>
<script>
export default {
  methods: {
    saveData() {
      window.localStorage.setItem("abc", JSON.stringify({ aaa: "111" }));
    },
    getData() {
      let data = window.localStorage.getItem("abc");
      alert(data);
    },
  },
};
</script>