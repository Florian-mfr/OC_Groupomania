<template>
  <div id="signup">
    <logHeader></logHeader>
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
        v-on:click.prevent="signup()"
      />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import logHeader from "../components/logHeader.vue";

export default {
  components: {
    logHeader,
  },
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }),
  methods: {
    signup() {
      const user = {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        password: this.password,
        id: "",
      };
      axios
        .post("http://localhost:3000/users/signup", user)
        .then((res) => {
          console.log(res)
          this.$router.push({ path: "home" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped lang='scss'>
#signup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#form {
  margin: 50px 0;
  label {
    font-weight: bold;
  }
  #firstName,
  #lastName,
  #email,
  #password {
    height: 20px;
    width: 200px;
    border: 2px solid rgb(0, 0, 0);
    border-radius: 10px;
  }
  #form-btn {
    border-style: none;
    background-color: rgb(79, 175, 154);
    color: #fff;
    padding: 10px 25px;
    border-radius: 15px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>