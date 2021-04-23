<template>
  <div id="login">
    <logHeader></logHeader>
    <form method="POST" id="form">
      <label for="email">Adresse e-mail :</label>
      <div>
        <input
          type="email"
          name="email"
          id="email"
          required="required"
          v-model="email"
          placeholder="Adresse Email"
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
          placeholder="Mot de passe"
        />
      </div>
      <br />
      <input
        id="form-btn"
        type="submit"
        value="Se connecter"
        v-on:click.prevent="signup()"
      />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import logHeader from "../components/logHeader";

export default {
  components: { logHeader },
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
        .post("http://localhost:3000/user/login", user)
        .then((res) => {
          console.log(res)
          localStorage.setItem('userId', res.data.userId)
          localStorage.setItem('token', res.data.token)
          this.$store.state.userId = res.data.userId
          this.$store.state.token = res.data.token
          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang='scss'>
@import "../sass/variables";

#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-width: 900px;
  background-color: #fff;
}
#form {
  margin: 50px 0;
  label {
    font-weight: bold;
  }
  #email, #password {
    height: 20px;
    width: 200px;
    border: 2px solid rgb(0, 0, 0);
    border-radius: 5px;
  }
  #form-btn {
    border-style: none;
    background-color: $themes;
    color: #fff;
    padding: 10px 25px;
    border-radius: 15px;
    font-weight: bold;
    cursor: pointer;
  }

}
</style>
