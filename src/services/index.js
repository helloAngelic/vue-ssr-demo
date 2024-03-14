import axios from "axios";
const headers = {
  'X-Access-Token': ''
}
const baseUrl = ''
const bgId = ''

export function getARiskOverview() {
  return axios.get(baseUrl + '/risk-detection-service/wzbg/getARiskOverview', {
    params: {
      bgId
    }, headers
  })
}

export function getCreditNote() {
  return axios.get(baseUrl + '/risk-detection-service/wzbg/getCreditNote', {
    params: {
      bgId
    }, headers
  })
}

export function getRelatedParty() {
  return axios.get(baseUrl + '/risk-detection-service/wzbg/getRelatedParty', {
    params: {
      bgId
    }, headers
  })
}

export function getTaxation() {
  return axios.get(baseUrl + '/risk-detection-service/wzbg/getTaxation', {
    params: {
      bgId
    }, headers
  })
}

export function getDetail() {
  return axios.get(baseUrl + '/risk-detection-service/wzbg/getDetail', {
    params: {
      bgId
    }, headers
  })
}

function getAndDelData() {
  return new Promise((resolve, reject) => {
    Promise.all([getARiskOverview(), getCreditNote(), getRelatedParty(), getTaxation(), getDetail()]).then(res => {
      console.log(res);
    })
  })
}