import axios from "axios";
const SET_AAA = "SET_AAA";
const SET_BBB = "SET_BBB";

const app = {
    namespaced: true,
    state: {
        aaa: 111,
        bbb: []
    },
    mutations: {
        [SET_AAA](state, data) {
            state.aaa = data;
        },
        [SET_BBB](state, data) {
            state.bbb = data
        }
    },
    actions: {
        setAaa({
            commit
        }, data) {
            commit(SET_AAA, data);
        },
        setBbb({ commit }, data) {
            const result = axios.get("http://jsonplaceholder.typicode.com/posts").then(res => {
                commit(SET_BBB, res.data)
            })
            return result
        }
    },
    getters: {
        getAaa: state => state.aaa
    }
}

export default app;