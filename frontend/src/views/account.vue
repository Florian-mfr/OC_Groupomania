<template>
  <div id="account">
    <Header></Header>
    <div class="account_options">
      <h2>Gérer mon compte</h2>
      <div class="options_password">
        <span>Changer le mot de passe</span>
        <form action="">
          <label for="change password">Nouveau mot de passe :</label>
          <input v-model='newPassword' type="text" class="password_input" />
        </form>
      </div>
      <div class="options_delete">
        <button class="delete-btn">Supprimer mon compte</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
    name: 'account',
    /*data: () => {
        newPassword: "",
    },*/
    components: {
        Header,
    }
}

</script>


<style scoped>
</style>