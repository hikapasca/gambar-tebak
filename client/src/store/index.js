import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import io from "socket.io-client";
// const socket = io("http://localhost:3000");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    leaderboard: [],
    questions: [],
    allAnswers: [],
    finalScore: [],
    username: '',
  },
  mutations: {
    ADD_USER(state, payload) {
      state.username = payload;
    },
    READ_LEADERBOARD(state, payload) {
      state.leaderboard = payload;
    },
    READ_QUESTION(state, payload) {
      state.questions = payload;
      // console.log(state.questions, `ini di mutasi`)
    },
    PUSH_ANSWER(state, payload) {
      state.allAnswers.push(payload);
    },
    PUSH_SCORE(state, payload) {
      state.finalScore.push(payload);
    },
    UPDATE_SCORE(state, payload) {
      state.finalScore.forEach((element) => {
        if (element.user === payload) {
          element.score += 10;
        }
      });
    },
    RESET_ANSWER(state) {
      state.allAnswers = [];
    },
    RESET_SCORE(state) {
      state.finalScore = [];
    },
  },
  actions: {
    getQuestion(context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/questions',
      })
        .then((result) => {
          // console.log(result, `ini result`);
          context.commit('READ_QUESTION', result.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  modules: {},
});
