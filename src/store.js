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
  mutations: {},
  actions: {
    signup(store, authData) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res);
          router.push("/dashboard");
        })
        .catch(error => console.log(error));
    },
    login(store, authData) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signIn?key=[API_KEY]",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res);
          router.push("/dashboard");
        })
        .catch(error => console.log(error));
    }
  },
  getters: {}
});
