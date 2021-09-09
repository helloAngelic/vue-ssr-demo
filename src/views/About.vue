<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="saveLocalStorageData">保存 localStorage</button>
    <button @click="getLocalStorageData">显示 localStorage</button>
    <br />
    <div>
      "app/getAaa":
      {{ $store.getters["app/getAaa"] }}
    </div>
    <br />
    <input type="text" v-model="aaa" />
    <button @click="setStoreData">修改 store</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aaa: "",
    };
  },
  methods: {
    saveLocalStorageData() {
      window.localStorage.setItem("abc", JSON.stringify({ aaa: "111" }));
    },
    getLocalStorageData() {
      let data = window.localStorage.getItem("abc");
      alert(data);
    },
    setStoreData() {
      this.$store.dispatch("app/setAaa", this.aaa);
    },
  },
};
</script>