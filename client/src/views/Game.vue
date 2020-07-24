<template>
    <div id="gameRoom">
        <button v-if="gameOn" @click="gameStart">Start!</button>
        <div v-else>
            <div id="question">
                <h3>{{$store.state.questions[this.count].answer}}</h3>
                <button @click="toLobby" class="btn btn-warning btn-sm">Leave Room</button>
                <div id="image">
                    <img :src='$store.state.questions[this.count].imageUrl' alt="ini gambar.">
                </div>
            </div>
            <div id="answerForm" class="d-flex flex-column">
                <div class="bg-light overflow-auto d-flex flex-column" style="height: 50px;">
                    <span class="mt-0" v-for="(item, index) in $store.state.allAnswers" :key="index">{{item}}</span>
                </div>
                <form @submit.prevent="nextQuestion">
                    <input style="width: 400px;" type="text" name="answer" v-model="answer" placeholder="Jawabanmu...">
                    &nbsp;<button class="btn btn-success" type="submit">Jawab!</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default {
  name: 'Game',
  data() {
    return {
        gameOn: true,
        count: 0,
        answer: '',
        score: 0
    }
  },
    created() {
        this.$store.dispatch('getQuestion')
        socket.on("gameStart",  (score) => {
             let userScore = {
                user: localStorage.user,
                score: 0
            }
            console.log(score, `ini di gamestart`)
            this.gameOn = false
            console.log(this.gameOn, `ini di gamestart`)
            this.$store.commit('PUSH_SCORE', userScore)
            this.$store.commit('PUSH_SCORE', score)
        })
        socket.on("nextQuestion",  (count) => {
            // console.log(count, `ini count`)
            this.count = count
        })
        socket.on("pushAnswer",  (answer) => {
            this.$store.commit('PUSH_ANSWER', answer)
        })
        socket.on("resetAnswer",  () => {
            this.$store.commit('RESET_ANSWER')
        })
        // socket.on("pushScore",  (score) => {
        //     this.$store.commit('PUSH_SCORE', score)
        // })
        socket.on("toLeaderBoard",  () => {
            this.$router.push({name: 'LeaderBoard'})
        })

        socket.on("updatenext", (data) => {
            this.$store.commit('UPDATE_SCORE', data.user)
            this.count = data.count
        })

        socket.on("updateEnd", (data) => {
            this.$store.commit('UPDATE_SCORE', data.user)
            this.$router.push({name: 'LeaderBoard'})
            this.$store.commit('RESET_ANSWER')
        })
    },
  methods: {
    toLobby() {
        this.$store.commit('RESET_SCORE')
        this.$router.push({name: 'Lobby'})
    },
    gameStart() {
        let userScore = {
                user: localStorage.user,
                score: 0
            }
        // this.$store.commit('PUSH_SCORE', userScore)
        // this.gameOn = false
        socket.emit("gameStart", userScore)
    },
    nextQuestion() {
        this.$store.commit('PUSH_ANSWER', this.answer)
        socket.emit("pushAnswer", this.answer)
        // console.log(this.count, `sebelum if`)
        if (this.count < 5) {
            // console.log(this.answer, this.$store.state.questions[this.count].answer, 'ini answer')
            if (this.answer.toLowerCase() == this.$store.state.questions[this.count].answer) {
                this.$store.commit('UPDATE_SCORE', localStorage.user)
                // socket.emit("updateScore", localStorage.user)
                // socket.emit("nextQuestion", this.count)
                this.count++
                console.log(this.count)
                console.log(this.$store.state.finalScore)
                socket.emit('updatenext', {user: localStorage.user, count: this.count})
                // console.log(this.count, `ini dalam count`)
            }
        } else {
            if (this.answer.toLowerCase() == this.$store.state.questions[this.count].answer) {
                this.$store.commit('UPDATE_SCORE', localStorage.user)
                this.$router.push({name: 'LeaderBoard'})
                this.$store.commit('RESET_ANSWER')
                socket.emit('updateEnd', {user: localStorage.user})
            }
        }
        this.answer = ''
    }
  }
};
</script>

<style>

</style>
