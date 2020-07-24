import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import io from "socket.io-client";
// const socket = io("http://localhost:3000");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    leaderboard: [],
    questions: [],
    allAnswers: [],
    finalScore: [],
    username: "",
    dataUser: []
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
      state.finalScore.forEach(element => {
        if (element.user === payload) {
          element.score += 10;
        }
      });
    },
    ADDED_SCORE(state, payload) {
      state.dataUser = payload;
      console.log(state.dataUser, "ini show all");
      console.log(state.dataUser, `ini show all`);
    },
    UPDATED_SCORE(state, payload) {
      // for (let i = 0; i < state.dataUser.length; i++) {
      //   if (state.dataUser[i].name === payload.name) {
      //     state.dataUser[i].score += payload.score;
      //   }
      // }
    },
    RESET_ANSWER(state) {
      state.allAnswers = [];
    },
    RESET_SCORE(state) {
      state.finalScore = [];
      state.dataUser = [];
    }
  },
  actions: {
    getQuestion(context) {
      console.log("apapapapa");
      axios({
        method: "GET",
        url: "http://localhost:3000/questions"
      })
        .then(result => {
          // console.log(result, `ini result`);
          console.log("paakakakakak");
          context.commit("READ_QUESTION", result.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    updateLeaderboard(context, payload) {
      // console.log("update masuk didalam");
      // const score = payload.score;
      const updateLeaderboard = {
        name: payload.name,
        score: payload.score
      };
      console.log(updateLeaderboard, "ini yg mau update");
      console.log(updateLeaderboard, `ini yg mau update`);
      axios({
        method: "PUT",
        url: "http://localhost:3000/leaderboards",
        data: updateLeaderboard
      })
        .then(result => {
          console.log("update masuk diluar");
          // context.commit("UPDATED_SCORE", updateLeaderboard);
        })
        .catch(err => {});
    },
    deleteLeaderboard(context, payload) {
      // console.log("update masuk didalam");
      axios({
        method: "DELETE",
        url: "http://localhost:3000/leaderboards"
      })
        .then(result => {
          // console.log("update masuk diluar");
          context.commit("RESET_SCORE");
        })
        .catch(err => {});
    },
    addLeaderboard(context, payload) {
      // console.log("add masuk diluar");
      const newLeaderboard = {
        name: payload.name,
        score: payload.score
      };
      axios({
        method: "POST",
        url: "http://localhost:3000/leaderboards",
        data: newLeaderboard
      })
        .then(result => {
          // console.log("add masuk didalam");
          // context.commit("ADDED_SCORE", newLeaderboard);
        })
        .catch(err => {});
    },
    showLeaderboard(context) {
      axios({
        method: "GET",
        url: "http://localhost:3000/leaderboards"
      })
        .then(result => {
          // console.log("add masuk didalam");
          context.commit("ADDED_SCORE", result.data);
        })
        .catch(err => {});
    }
  },
  modules: {}
});
