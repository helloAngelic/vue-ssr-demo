<template>
  <div class="print"></div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch("initData");
  },
  name: "Home",
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
  updated() {
    console.log("updated");
  },
};
</script>
