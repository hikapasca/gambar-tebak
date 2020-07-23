import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    leaderboard: [],
    question: []
  },
  mutations: {
    READ_LEADERBOARD(state, payload) {
      state.leaderboard = payload;
    },
    READ_QUESTION(state, payload) {}
  },
  actions: {
    getLeaderboard(context) {
      axios({
        method: "GET",
        url: "http://localhost:3000/leaderboards"
      })
        .then(result => {
          console.log(result.data);
          context.commit("READ_LEADERBOARD", result.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    getQuestion(context) {
      axios({
        method: "GET",
        url: "http://localhost:3000/questions"
      })
        .then(result => {
          console.log(result);
          context.commit("READ_QUESTION", result.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    addLeaderboard(context, payload) {
      axios({
        method: "POST",
        url: "http://localhost:3000/leaderboards"
      })
        .then(result => {
          console.log(result.data);
          context.commit("READ_QUESTION", payload);
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  modules: {}
});
