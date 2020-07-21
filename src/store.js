import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    clearAuth(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    async signup({ commit }, authData) {
      try {
        let res = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATtI__1vvoc6-SK4yPTBsrXdUZS0tq8bk",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        );
        commit("authUser", {
          token: res.data.idToken,
          userId: res.data.userId
        });
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.userId);
        await router.push("/dashboard");
      } catch (error) {
        console.log(error);
      }

      // axios
      //   .post(
      //     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATtI__1vvoc6-SK4yPTBsrXdUZS0tq8bk",
      //     {
      //       email: authData.email,
      //       password: authData.password,
      //       returnSecureToken: true
      //     }
      //   )
      //   .then(res => {
      //     console.log(res);
      //     commit("authUser", {
      //       token: res.data.idToken,
      //       userId: res.data.localId
      //     });
      //     localStorage.setItem("token", res.data.idToken);
      //     localStorage.setItem("userId", res.data.userId);
      //     router.push("/dashboard");
      //   })
      //   .catch(error => console.log(error));
    },
    async login({ commit }, authData) {
      try {
        let res = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signIn?key=AIzaSyATtI__1vvoc6-SK4yPTBsrXdUZS0tq8bk",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        );
        commit("authUser", {
          token: res.data.idToken,
          userId: res.data.userId
        });
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.userId);
        await router.push("/dashboard");
      } catch (error) {
        console.log(error);
      }

      // axios
      //   .post(
      //     "https://identitytoolkit.googleapis.com/v1/accounts:signIn?key=AIzaSyATtI__1vvoc6-SK4yPTBsrXdUZS0tq8bk",
      //     {
      //       email: authData.email,
      //       password: authData.password,
      //       returnSecureToken: true
      //     }
      //   )
      //   .then(res => {
      //     console.log(res);
      //     commit("authUser", {
      //       token: res.data.idToken,
      //       userId: res.data.userId
      //     });
      //     localStorage.setItem("token", res.data.idToken);
      //     localStorage.setItem("userId", res.data.userId);
      //     router.push("/dashboard");
      //   })
      //   .catch(error => console.log(error));
    },
    async logout({ commit }) {
      commit("clearAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      await router.replace("/");
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token) return;
      commit("authUser", {
        idToken: token,
        userId: userId
      });
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    ifAuthenticated(state) {
      return state.idToken !== null;
    }
  }
});
