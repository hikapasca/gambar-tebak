<template>
    <div id="leaderboard">
        <div id="boxLeader">
            <div id="leaderHeader">
                <h1>Hasil Kerecehan</h1>
                <button @click="balikLobby" class="btn btn-primary">Balik Lobby</button>
            </div>
            <div id="leaderTable">
                <table class="table table-dark">
                    <thead>
                        <tr>
                        <th scope="col">Nama</th>
                        <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <LeaderData v-for="(user, index) in $store.state.finalScore" :key="index" :score="user"></LeaderData>
                    </tbody>
                </table>
                    <p>{{this.$store.state.dataUser}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import LeaderData from '../components/LeaderData.vue';
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default {
  name: 'LeaderBoard',
  components: {
    LeaderData,
  },
  created() {
    //   socket.on("deleteScore",  () => {
    //     this.$store.dispatch('deleteLeaderboard')
    // })
    this.$store.dispatch('showLeaderboard')
  },
  methods: {
    balikLobby() {
        // this.$store.commit('RESET_SCORE')
        // socket.emit("deleteScore")
        this.$store.dispatch('deleteLeaderboard')
        this.$router.push({name: 'Lobby'})
    }
  }
};
</script>

<style>

</style>
