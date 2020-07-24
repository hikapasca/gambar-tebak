<template>
  <div id="gameRoom">
    <div id="buttonBeforeGame" v-if="gameOn">
      <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <polygon points="60,30 90,90 30,90">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 60 70"
            to="360 60 70"
            dur="10s"
            repeatCount="indefinite"
          />
        </polygon>
      </svg>
      <button id="buttonGame" class="btn btn-success btn-lg" @click="gameStart">Start!</button>
    </div>
    <div v-else>
      <div id="question">
        <h3>Apa ya jawabannya???</h3>
        <button @click="toLobby" class="btn btn-warning btn-sm">Leave Room</button>
        <div id="image">
          <img :src="$store.state.questions[this.count].imageUrl" alt="ini gambar." />
          <div
            class="bg-light overflow-auto d-flex flex-column"
            style="height: 300px; width: 400px;"
          >
            <span
              class="mt-0"
              v-for="(item, index) in $store.state.allAnswers"
              :key="index"
            >{{item}}</span>
          </div>
        </div>
      </div>
      <div id="answerForm">
        <form @submit.prevent="nextQuestion">
          <input
            style="width: 400px;"
            type="text"
            name="answer"
            v-model="answer"
            placeholder="Jawabanmu..."
          />
          &nbsp;
          <button class="btn btn-success" type="submit">Jawab!</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default {
  name: "Game",
  data() {
    return {
      gameOn: true,
      count: 0,
      answer: "",
      score: 0
    };
  },
  created() {
    this.$store.dispatch("getQuestion");
    socket.on("gameStart", () => {
      this.gameOn = false;
    });
    // socket.on("updateScore",  (user) => {
    //     this.$store.dispatch('updateLeaderboard', user)
    // })
    socket.on("pushAnswer", answer => {
      this.$store.commit("PUSH_ANSWER", answer);
    });
    socket.on("resetAnswer", () => {
      this.$store.commit("RESET_ANSWER");
    });
    // socket.on("pushScore",  (score) => {
    //     this.$store.commit('PUSH_SCORE', score)
    // })
    socket.on("toLeaderBoard", () => {
      this.$router.push({ name: "LeaderBoard" });
    });

    socket.on("updatenext", data => {
      this.$store.commit("UPDATE_SCORE", data.user);
      this.count = data.count;
    });

    socket.on("updateEnd", () => {
      const userScore = {
        name: localStorage.user,
        score: this.score
      };
      this.$store.dispatch("updateLeaderboard", userScore);
      // this.$store.commit('UPDATE_SCORE', data.user)
      this.$router.push({ name: "LeaderBoard" });
      this.$store.commit("RESET_ANSWER");
    });
  },
  methods: {
    toLobby() {
      this.$store.commit("RESET_SCORE");

      this.$router.push({ name: "Lobby" });
    },
    gameStart() {
      // let userScore = {
      //         name: localStorage.user,
      //         score: 0
      //     }
      // this.$store.dispatch('addLeaderboard', userScore)
      this.gameOn = false;
      socket.emit("gameStart");
    },
    nextQuestion() {
      this.$store.commit("PUSH_ANSWER", this.answer);
      socket.emit("pushAnswer", this.answer);
      // console.log(this.count, `sebelum if`)
      if (this.count < 2) {
        // console.log(this.answer, this.$store.state.questions[this.count].answer, 'ini answer')
        if (
          this.answer.toLowerCase() ==
          this.$store.state.questions[this.count].answer
        ) {
          this.score += 10;
          // this.$store.commit('UPDATE_SCORE', localStorage.user)
          // socket.emit("updateScore", localStorage.user)
          // socket.emit("nextQuestion", this.count)
          this.count++;
          socket.emit("updatenext", {
            user: localStorage.user,
            count: this.count
          });
          // console.log(this.count, `ini dalam count`)
        }
      } else if (
        this.answer.toLowerCase() ==
        this.$store.state.questions[this.count].answer
      ) {
        this.score += 10;
        const userScore = {
          name: localStorage.user,
          score: this.score
        };
        this.$store.dispatch("updateLeaderboard", userScore);
        // this.$store.commit('UPDATE_SCORE', localStorage.user)
        //   this.$store.commit("RESET_ANSWER");
        socket.emit("updateEnd");

        //   this.$router.push({ name: "LeaderBoard" });
      }

      //   if (this.count === 2) {
      //     const userScore = {
      //       name: localStorage.user,
      //       score: this.score
      //     };
      //     this.$store.dispatch("updateLeaderboard", userScore);
      //   }
      console.log(this.score, "ini score");
      this.answer = "";
    }
  }
};
</script>

<style>
</style>
