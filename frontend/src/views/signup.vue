<template>
  <div id="signup">
    <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/signup">S'inscrire</router-link>
    </div>
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
import axios from "axios";

export default {
  data: () => ({
    firstName: "maria",
    lastName: "rosa",
    email: "maria@mail.com",
    password: "123",
  }),
  methods: {
    signup() {
      const user = {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/users/signup", user,
          {headers: {"Content-Type": "application/json"}})
        .then((res) => {
          console.log(res)
            location.href = "/";
        })
        .catch((error) => {
          console.log(error)
          });

      /*axios
        .post("http://localhost:3000/user/signup", user)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        })
        .catch((error) => {
          console.log(error);
        });*/
    },
  },
};
</script>