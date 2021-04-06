<template>
  <div id="signup">
    <form method="POST" id="form">
      <label for="firstName">Prénom :</label>
      <div>
        <input
          type="text"
          name="prenom"
          id="firstName"
          required="required"
          v-model="firstName"
        />
      </div>
      <br />
      <label for="lastName">Nom :</label>
      <div>
        <input
          type="text"
          name="nom"
          id="lastName"
          required="required"
          v-model="lastName"
        />
      </div>
      <br />
      <label for="email">Adresse e-mail :</label>
      <div>
        <input
          type="email"
          name="email"
          id="email"
          required="required"
          v-model="email"
        />
      </div>
      <br />
      <label for="password">Mot de passe :</label>
      <div>
        <input
          type="password"
          name="password"
          id="password"
          required="required"
          v-model="password"
        />
      </div>
      <br />
      <input
        id="form-btn"
        type="submit"
        value="Valider l'inscription"
        v-on:click="signup()"
      />
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  name: 'signup',
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
  methods: {
    signup: function () {
      const user = {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        password: this.password,
      };

      this.$http.post(
          "http://localhost:3000/users/signup/", user
      )
    },
  },
};
</script>
