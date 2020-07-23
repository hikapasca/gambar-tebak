<template>
    <div id="gameRoom">
        <button v-if="gameOn" @click="gameStart">Start!</button>
        <div v-else>
            <div id="question">
                <h3>{{$store.state.questions[this.count].answer}}</h3>
                <button class="btn btn-warning btn-sm">Leave Room</button>
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
    // console.log(this.$store.state.questions, `hai ini question`)
  },
  methods: {
    gameStart() {
        this.gameOn = false
    },
    nextQuestion() {
        this.$store.commit('PUSH_ANSWER', this.answer)

        if (this.answer.toLowerCase() == this.$store.state.questions[this.count].answer && this.count < 2) {
            this.score+=10
            this.answer = ''
            this.count++
        } else {
            if (this.answer.toLowerCase() == this.$store.state.questions[this.count].answer) {
            this.score+=10
            }
            let userScore = {
                user: localStorage.user,
                score: this.score
            }
            this.$store.commit('PUSH_SCORE', userScore)
            this.$store.commit('RESET_ANSWER')
            this.$router.push({name: 'LeaderBoard'})
        }
    }
  }
};
</script>

<style>

</style>
