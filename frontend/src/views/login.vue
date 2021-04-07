<template>
  <div class="login">
    <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/signup">S'inscrire</router-link>
    </div>
    <h1>Groupomania</h1>
    <div id="signup">
      <form method="POST" id="form">
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
          value="Se connecter"
          v-on:click="signup()"
        />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signup() {
      const user = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/users/login", user)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        })
        .catch((error) => {
          console.log(error)
        });
    },
  },
};
</script>
