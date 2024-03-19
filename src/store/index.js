import Vue from 'vue'
import Vuex from 'vuex'
import { getAndDelData } from "../services/index"

Vue.use(Vuex)

export default function createStore() {
  return new Vuex.Store({
    state: {
      bgId: '', // 报告id
      detailData: undefined,// 详情
      overviewList: undefined,// 风险概述
      overviewTableArr: undefined,// 风险概述
      bureauData: undefined,// 税局风险提示
      relatedPartyData: undefined,// 业务伙伴风险
      taxationData: undefined,// 税务风险F
      iconIsShow: false,
    },
    mutations: {
      set_bgId(state, data) {
        state.bgId = data
      },
      set_detailData(state, data) {
        state.detailData = data
      },
      set_overviewList(state, data) {
        state.overviewList = data
      },
      set_overviewTableArr(state, data) {
        state.overviewTableArr = data
      },
      set_bureauData(state, data) {
        state.bureauData = data
      },
      set_relatedPartyData(state, data) {
        state.relatedPartyData = data
      },
      set_taxationData(state, data) {
        state.taxationData = data
      },
      set_iconIsShow(state, data) {
        state.iconIsShow = data
      }
    },
    actions: {
      initData({ commit, state }, query) {
        const { id, down } = query
        if (down == 'true') {
          commit('set_iconIsShow', true)
        } else {
          commit('set_iconIsShow', false)
        }
        console.log(4);
        return getAndDelData({ commit, state })
      }
    }
  })
}