import axios from "axios";
// const axios = require('axios')
import CryptoJS from "crypto-js";
// const CryptoJS = require('crypto-js')
import dayjs from "dayjs";
// const dayjs = require('dayjs')
const headers = {
  // 'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE3MTAzODI3NjcsImV4cCI6MTcxMDQ2OTE2NywiaWF0IjoxNzEwMzgyNzY3LCJ1c2VySWQiOjEwMDAwMDEwMDgzLCJsb2dpbklkZW50aWZpY2F0aW9uIjoiMjA4ZGM0NmVhMzQzNDQ1OTk1MWQ5N2E1MTJjM2RhOTgifQ.a3Lkx7lE6yMczQA_jZZ3uWhoqSJM5OXuC9evj0pf208',
  'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE3MTEwNzIyNzAsImV4cCI6MTcxMTE1ODY3MCwiaWF0IjoxNzExMDcyMjcwLCJ1c2VySWQiOjEzNjcsImxvZ2luSWRlbnRpZmljYXRpb24iOiJkM2Y4NDA0OTFmYTg0MDI0OTc4MWQyMGZjMDM3ZWVhZiJ9.zrGABi36FtblTqYJzhd3vsDjFoklegnQs6uVmfPcfNM',


}
const baseUrl = 'https://nqa-pre.aisino.cn/api'
// const baseUrl = ''
// 加解密
const AES_KEY = '1234567890hijklm', IV = '1234567890abcdef';
const decrypt = function (data) {
  const key = CryptoJS.enc.Utf8.parse(AES_KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
  return decrypt;
}
const encrypt = function (data) {
  const key = CryptoJS.enc.Utf8.parse(AES_KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}
const bgId = 101036
const sourceCode = 'nqa'
const data = encrypt(JSON.stringify({ bgId, sourceCode }))
// const data = 'pw5ks34iOcNF7Dddzc48DkHDe7lYfsb/Vd5nYtpy21mFKt0al4LrNPYhgHlyMZPz'

function getARiskOverview() {
  return axios.get(baseUrl + '/risk-detection-service/wzbg/getARiskOverview', {
    params: {
      data
    }, headers
  })
}

function getCreditNote() {
  return axios.get(baseUrl + '/risk-detection-service/wzbg/getCreditNote', {
    params: {
      data
    }, headers
  })
}

function getRelatedParty() {
  return axios.get(baseUrl + '/risk-detection-service/wzbg/getRelatedParty', {
    params: {
      data
    }, headers
  })
}

function getTaxation() {
  return axios.get(baseUrl + '/risk-detection-service/wzbg/getTaxation', {
    params: {
      data
    }, headers
  })
}

function getDetail() {
  return axios.get(baseUrl + '/risk-detection-service/wzbg/getDetail', {
    params: {
      data
    }, headers
  })
}
// { commit, state }
// getDetail(), getTaxation(), getARiskOverview(), getCreditNote(), getRelatedParty()
export function getAndDelData({ commit, state }) {
  console.log(5);
  return new Promise((resolve, reject) => {
    Promise.all([getDetail(), getARiskOverview()]).then(promise => {
      console.log(6);
      console.log(promise);
      promise.forEach(res => {
        if (res.status == 200) {
          let urlArr = res.config.url.split('/')
          let flag = urlArr[urlArr.length - 1]
          let data = JSON.parse(decrypt(res.data.data))
          if (flag == 'getDetail') {
            let result = {
              ...data.result,
              bgsjShow: dayjs(data.result.bgsj).format("YYYY年MM月DD日")
            }
            commit('set_detailData', result)
          }
          if (flag == 'getTaxation') {
            // commit('set_taxationData', data.result)
          }
          if (flag == 'getARiskOverview') {
            let { overviewList, overviewTableArr } = dealOverViewData(data.result)
            commit('set_overviewList', overviewList)
            commit('set_overviewTableArr', overviewTableArr)
          }
          if (flag == 'getCreditNote') {

          }
          if (flag == 'getRelatedParty') {

          }
        }
      })
      resolve(6)
    }).catch(err => {
      // console.log(err);
    })
  })
}

// 处理风险概述数据
function dealOverViewData(result) {
  let overviewList = [], overviewTableArr = []
  let overviewTableArrType = [
    {
      thTitle: '高风险',
      thClass: 'table-title print-bgA04F66',
      thStyle: `min-height: 200px;
      width: 100px;
      line-height: 100px;
      font-size: 30px;
      font-weight: bold;
      color: #ffffff;
      writing-mode: vertical-rl;
      text-align: center;
      letter-spacing: 5px;
      font-weight: bold;
      background-color: #a04f66;
      `,
      thRowSpan: 1,
      tdClass: 'print-bgFCF9FA',
      tdStyle: 'background-color: #fcf9fa;',
      tdRowSpan: 1,
      listName: 'highList',
    },
    {
      thTitle: '中风险',
      thClass: 'table-title print-bg9E6A4E',
      thStyle: `min-height: 200px;
      width: 100px;
      line-height: 100px;
      font-size: 30px;
      font-weight: bold;
      color: #ffffff;
      writing-mode: vertical-rl;
      text-align: center;
      letter-spacing: 5px;
      font-weight: bold;
      background-color: #9e6a4e;
      `,
      thRowSpan: 1,
      tdClass: 'print-bgFCFAF9',
      tdStyle: 'background-color: #fcfaf9;',
      tdRowSpan: 1,
      listName: 'mediumList',
    },
    {
      thTitle: '低风险',
      thClass: 'table-title print-bg9F8D4F',
      thStyle: `min-height: 200px;
      width: 100px;
      line-height: 100px;
      font-size: 30px;
      font-weight: bold;
      color: #ffffff;
      writing-mode: vertical-rl;
      text-align: center;
      letter-spacing: 5px;
      font-weight: bold;
      background-color: #9f8d4f;
      `,
      thRowSpan: 1,
      tdClass: 'print-bgFCFBF9',
      tdStyle: 'background-color: #fcfbf9;',
      tdRowSpan: 1,
      listName: 'lowList',
    },
  ]
  let types = {
    1: '税务风险',
    2: '税局风险',
    3: '',
    4: '业务伙伴风险',
  }
  overviewList = result.fxResultList.map(item => {
    return {
      fxlx: types[item.detectionNo],
      jcx: item.detectionNum,
      fxs: item.riskNum
    }
  })
  overviewTableArrType.forEach(elem => {
    let listName = elem.listName
    if (result[listName].length) {
      let thTitle = elem.thTitle
      let thStyle = elem.thStyle
      let thRowSpan = result[listName].length
      let tdStyle = elem.tdStyle
      let currentFxlx
      result[listName].forEach((item, index) => {
        item['tdRowSpan'] = 1
        item['isTd'] = false
        if (!currentFxlx || (currentFxlx && currentFxlx !== item.fxlx)) {
          let fxlx = item.fxlx
          currentFxlx = item.fxlx
          let itemNumber = result[listName].filter(val => val.fxlx === fxlx).length
          item['tdRowSpan'] = itemNumber || 1
          item['isTd'] = true
        }
        item['isTh'] = index === 0 ? true : false
        item['isBlock'] = false
        item['thTitle'] = thTitle
        item['thStyle'] = thStyle
        item['thRowSpan'] = thRowSpan
        item['tdStyle'] = index % 2 === 1 ? "" : tdStyle
      })
      overviewTableArr.push(...result[listName])
    } else {
      let thStyle = elem.thStyle
      overviewTableArr.push({
        ...elem,
        isTh: true,
        isBlock: true,
        thStyle: thStyle
      })
    }
  })
  return {
    overviewList,
    overviewTableArr
  }
}


// getAndDelData({ commit: 1 }).then(res => {
//   console.log(res);
// })