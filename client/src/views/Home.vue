<template>
  <div id="homepage">
        <h1>GAMBAR? TEBAK!</h1>
        <div id="userJoin">
            <form @submit.prevent="addUser">
                <label for="name">Siapa namanya?</label><br>
                <input v-model="user" type="text" name="name" id="name" placeholder="namamu.."><br><br>
                <button class="btn btn-success" type="submit">Masook!</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      user: '',
    }
  },
  methods: {
    addUser() {
      localStorage.setItem(`user`, this.user)
      this.$router.push({name: 'Lobby'})
    }
  }
};
</script>

<style>

</style>
