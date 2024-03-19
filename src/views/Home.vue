<template>
  <main class="print">
    <section id="page1">
      <!-- 首页 -->
      <header class="banner">
        <img src="../assets/print_banner.png" alt="" class="banner-img" />
        <h1 class="banner-title">
          <img src="../assets/print_banner_title.png" alt="" />
        </h1>
        <p class="banner-text">
          {{ detailData.qymc }}
        </p>
        <p class="banner-time">报告生成时间：{{ detailData.bgsj }}</p>
        <img src="../assets/print_banner_time.png" alt="" class="banner-time-img" />
      </header>
      <!-- 报告说明 -->
      <section class="container">
        <h1 class="title">
          <span
            >报告说明
            <img src="../assets/print_content_title.png" alt="" class="title-img" />
          </span>
        </h1>
        <div class="content">
          <p class="text">经报告所涉主体授权同意，本报告由爱信诺征信有限公司（下称“爱信诺”）提供、且仅提供给经报告所涉主体确认的特定主体使用。</p>
          <p class="text">
            本报告构成商业机密。未经报告所涉主体及爱信诺同意，该等特定主体不得将本报告用于除上述授权目的之外的其他任何目的/用途；其他任何企业、机构或个人不得查看、保存、公布、泄露、提供、使用本报告中的任何内容/信息，不得将本报告之任何内容/信息用于任何目的/用途。否则，爱信诺保留采取一切法律手段追究其法律责任的权利。
          </p>
          <p class="text">
            本报告知识产权归属于爱信诺所有。未经爱信诺同意，任何企业、机构或个人不得发表、修改、歪曲、篡改、发行、展示、改编本报告全部或部分内容，不得以任何形式复制、转发或公开传播本报告的全部或部分内容，不得将本报告之全部或部分用于营利或未经允许的其他任何用途。爱信诺保留不同时期或由于某些原因，对企业风险检测报告的修改权、实时更新权、以及对企业信息异议的更正权。否则，爱信诺保留采取一切法律手段追究其法律责任的权利。
          </p>
          <p class="text">
            爱信诺恪守独立、客观和公正的原则，为报告所涉主体提供专业信用评估报告。除非特别声明，本报告信息未经复核，爱信诺力求但不保证报告数据的准确性、时效性和完整性。在任何情况下，爱信诺不对因使用本报告而产生的任何后果承担法律责任，不承担由于因此而引起的损失和损害。
          </p>
        </div>
        <!-- 目录 -->
      </section>
    </section>
    <!-- 风险概述 -->
    <section id="page2" class="container">
      <h1 class="title">
        <span
          >一、风险概述
          <img src="../assets/print_content_title.png" alt="" class="title-img" />
        </span>
      </h1>
      <div class="page2-table">
        <table width="100%" class="table1">
          <colgroup>
            <col width="33.3%" />
            <col width="33.3%" />
            <col width="33.3%" />
          </colgroup>
          <thead>
            <tr>
              <th>风险类型</th>
              <th>检测项</th>
              <th>风险数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in overviewList" :key="index" :style="index % 2 === 1 ? '' : 'background:#f5f5f5'">
              <td>{{ item.fxlx }}</td>
              <td>{{ item.jcx }}</td>
              <td :class="{ fx: true, 'fx-normal': item.fxs == 0 }">{{ item.fxs }}</td>
            </tr>
          </tbody>
        </table>

        <table width="100%" class="table2">
          <colgroup>
            <col width="4%" />
            <col width="48%" />
            <col width="48%" />
          </colgroup>
          <tbody>
            <tr>
              <th colspan="3">税务风险</th>
            </tr>
            <tr v-for="(item, index) in overviewTableArr" :key="index">
              <td v-if="item.isTh" :rowspan="item.thRowSpan" :class="item.thClass">{{ item.thTitle }}</td>
              <template v-if="item.isBlock">
                <td rowspan="1" colspan="2" class="table-no-data">暂无风险</td>
              </template>
              <template v-else>
                <td v-if="item.isTd" :rowspan="item.tdRowSpan" :class="item.tdClass">{{ item.fxlxmc }}</td>
                <td :class="item.tdClass">
                  <a href="javascript:void(0)" @click="goAnchor(`${bgId}${item.id}`)" class="a_xhx">{{ item.fxdmc }}</a>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div id="download" v-if="iconIsShow">
      <span>下载</span>
    </div>
  </main>
</template>

<script>
export default {
  asyncData({ store, route }) {
    console.log(route);
    return store.dispatch("initData", route.query);
  },
  name: "Home",
  data() {
    return {
      // iconIsShow: false,
    };
  },
  computed: {
    detailData() {
      return this.$store.state.detailData || {};
    },
    overviewList() {
      return this.$store.state.overviewList || [];
    },
    overviewTableArr() {
      return this.$store.state.overviewTableArr || [];
    },
    iconIsShow() {
      return this.$store.state.iconIsShow || false;
    },
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
    // this.$store.dispatch("initData").then((res) => {
    //   console.log("store");
    // });
  },
  updated() {
    console.log("updated");
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#page1,
#page2 {
  margin-bottom: 20px;
  background-color: #ffffff;
}
.print {
  position: relative;
  background-color: #eeeeee;
}
.banner {
  position: relative;
  font-size: 0;
  /* margin-bottom: 54px; */
}
.banner-img {
  width: 100%;
}
.banner-title {
  position: absolute;
  top: 177px;
  left: 200px;
  width: 517px;
  height: 62px;
}
.banner-title img {
  width: 100%;
  height: 100%;
}
.banner-text {
  position: absolute;
  top: 266px;
  left: 0;
  width: 908px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  color: #222222;
}
.banner-time {
  position: absolute;
  top: 360px;
  left: 200px;
  width: 500px;
  font-size: 26px;
  font-weight: 400;
  color: #666666;
  text-align: center;
}
.banner-time-img {
  position: absolute;
  top: 400px;
  left: 200px;
  width: 500px;
}
.container {
  padding: 54px 40px 40px;
}
.title {
  font-size: 36px;
  font-weight: 800;
  color: #333333;
  text-align: center;
  margin-bottom: 40px;
}
.title > span {
  position: relative;
}
.title > span .title-img {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}
.content .text {
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  line-height: 36px;
  text-indent: 2em;
  text-align: start;
}
.page2-table .table1 {
  border: 1px solid #dddddd;
  border-collapse: collapse;
  margin-bottom: 30px;
}
.page2-table th,
.page2-table td {
  line-height: 60px;
  font-size: 18px;
  color: #333333;
  font-weight: 400;
  text-align: center;
  font-family: Source Han Serif CN;
  /* border: 1px solid #dddddd; */
}
/* .page2-table td {
  color: #ffffff;
} */
.page2-table th {
  font-weight: 600;
  background: #94466e;
  color: #ffffff;
}
.page2-table td.fx {
  color: #e73856;
}
.a_xhx {
  border-bottom: 2px solid;
  padding-bottom: 6px;
  text-decoration: none;
}
td.table-no-data {
  height: 140px;
  color: #909399;
  font-size: 14px;
  border: 1px solid #dddddd;
  background: #ffffff;
}
td.table-title {
  min-height: 200px;
  width: 100px;
  line-height: 100px;
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
  writing-mode: vertical-rl;
  text-align: center;
  letter-spacing: 5px;
  font-weight: bold;
}
.print-bgA04F66 {
  background-color: #a04f66;
}
.print-bg9E6A4E {
  background-color: #9e6a4e;
}
.print-bg9F8D4F {
  background-color: #9f8d4f;
}
.print-bgFCF9FA {
  background-color: #fcf9fa;
}
.print-bgFCFAF9 {
  background-color: #fcfaf9;
}
.print-bgFCFBF9 {
  background-color: #fcfbf9;
}
</style>
