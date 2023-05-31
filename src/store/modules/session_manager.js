import axios from 'axios';

const BASE_URL = "http://localhost:3000/";

const state = {
    auth_token: null,
    user: {
        id: null,
        username: null,
        email: null,
        gamesPlayed: null,
        averageScore: null,
        topScore: null
    },
}
const getters = {
    getAuthToken(state) {
        return state.auth_token
    },
    getUserEmail(state) {
        return state.user?.email
    },
    getUserID(state) {
        return state.user?.id
    },
    getGamesPlayed(state){
        return state.user?.gamesPlayed
    },
    getAverageScore(state){
        return state.user?.averageScore
    },
    getBestScore(state){
        return state.user?.topScore
    },
    isLoggedIn(state) {
        const loggedOut = state.auth_token == null || state.auth_token == JSON.stringify(null);
        return !loggedOut;
    }
}

const actions = {
    submitGame({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios
            .post(`${BASE_URL}member-data`, payload)
            .then((response) => {
                console.log(response)
                commit("setUserInfoFromToken", response);
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    registerUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${BASE_URL}users`, payload)
                .then((response) => {
                    commit("setUserInfo", response);
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    loginUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${BASE_URL}users/sign_in`, payload)
                .then((response) => {
                    commit("setUserInfo", response);
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    logoutUser({commit}) {
        const config = {
            headers: {
                authorization: state.auth_token
            },
        };
        new Promise((resolve) => {
            axios
            .delete(`${BASE_URL}users/sign_out`, config)
            .then(() => {
                commit("resetUserInfo");
                resolve();
            })
        })
    },
    loginUserWithToken({commit}, payload) {
        const config = {
            headers: {
                authorization: payload.auth_token
            },
        }
        // console.log(payload)
        // console.log(config)
        new Promise((resolve, reject) => {
            axios
            .get(`${BASE_URL}member-data`, config)
            .then((response) => {
                // console.log(response)
                commit("setUserInfoFromToken", response);
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    loginUserWithToken2({commit}, payload) {
        const config = {
            headers: {
                authorization: payload
            },
        }
        // console.log(payload)
        // console.log(config)
        new Promise((resolve, reject) => {
            axios
            .get(`${BASE_URL}member-data`, config)
            .then((response) => {
                // console.log(response)
                commit("setUserInfoFromToken", response);
                console.log(localStorage.getItem("auth_token"))
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
};
const mutations = {
    setUserInfo(state, data) {
        state.user = data.data.user;
        state.auth_token = data.headers.authorization;
        axios.defaults.headers.common["Authorization"] = data.headers.authorization;
        localStorage.setItem("auth_token", data.headers.authorization)
    },
    setUserInfoFromToken(state, data){
        state.user = data.data.user;
        state.auth_token = localStorage.getItem("auth_token");
    },
    resetUserInfo(state) {
        state.user = {
            id: null,
            username: null,
            email: null,
        };
        state.auth_token = null
        localStorage.removeItem("auth_token")
        axios.defaults.headers.common["Authorization"] = null
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}