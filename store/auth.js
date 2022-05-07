import Cookie from "cookie";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";

export const state = () => ({
  token: null,
  data: {}
})

export const mutations = {
  setToken(state, token) {
   state.token = token
  },
  clearToken(state) {
    state.token = null
  },
  data(state, data) {
    state.data = data
  }
}

export const actions = {
  async register({ commit }, formData) {
    const data = await this.$axios.$post('/api/auth/registr', formData)
    if (data.type === 'created')
      commit("data", data)
    return data
  },
  async login({commit, dispatch }, formData) {
    const data = await this.$axios.$post('/api/auth/login', formData)
    const token = data.token
    if(token)
      dispatch('setToken', token)
    if (data.type === 'success')
      commit("data", data)
    return data
  },
  setToken({commit}, token){
    this.$axios.setToken(token);
    commit('setToken', token)
    jsCookie.set("jwt-token", token);
  },
  logout({ commit }) {
    this.$axios.setToken(false);
    commit("clearToken");
    jsCookie.remove("jwt-token");
  },
  autoLogin({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie;
    const cookies = Cookie.parse(cookieStr || "") || {};
    const token = cookies["jwt-token"];

    if (isJWTValid(token)) {
      dispatch("setToken", token);
    } else {
      dispatch("logout");
    }
  },
}

export const getters = {
  dataObj({ data }) {
    return data
  },
  isAuthenticated({token}){
    return Boolean(token)
  }, 
  token({token}){
    return token
  }
}

function isJWTValid(token) {
  if (!token) 
    return false;

  const jwtData = jwtDecode(token) || {};
  const expires = jwtData.exp || 0;
  return new Date().getTime() / 1000 < expires;
}
