<template>
  <div id="leaderboard">
    <div id="boxLeader">
      <div id="leaderHeader">
        <h1>Hasil Kerecehan</h1>
        <button @click="balikLobby" class="btn btn-primary">Balik Lobby</button>
      </div>
      <div id="leaderTable">
        <table class="table table-light">
          <thead>
            <tr>
              <th scope="col">Nama</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            <LeaderData v-for="(user, index) in $store.state.dataUser" :key="index" :score="user"></LeaderData>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import LeaderData from "../components/LeaderData.vue";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default {
  name: "LeaderBoard",
  components: {
    LeaderData
  },
  data() {
    return {
      leaderboardSound: new Audio(require("../assets/leaderboardSound.mp3"))
    };
  },
  created() {
    this.leaderboardSound.play();
    //   socket.on("deleteScore",  () => {
    //     this.$store.dispatch('deleteLeaderboard')
    // })
    this.$store.dispatch("showLeaderboard");
  },
  methods: {
    balikLobby() {
      // this.$store.commit('RESET_SCORE')
      // socket.emit("deleteScore")
      this.leaderboardSound.pause();
      this.leaderboardSound.currentTime = 0;
      this.$store.dispatch("deleteLeaderboard");
      this.$router.push({ name: "Lobby" });
    }
  }
};
</script>

<style>
</style>
