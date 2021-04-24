<template>
  <div id="logHeader">
    <div class="header_logo">
      <router-link to="/home">
        <img src="../assets/logo_couleur.png" alt="logo" class="logo_img" />
      </router-link>
    </div>

    <span class="header_login">
      <router-link to="/">Se connecter</router-link>
    </span>

    <span class="header_signup">
      <router-link to="/signup">S'inscrire</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: "logHeader",
};
</script>

<style lang='scss'>
@import "../sass/variables";

*,
a {
  text-decoration: none;
  margin: 0;
  padding: 0;
}
#logHeader {
  display: grid;
  align-items: center;
  grid-template-columns: 3fr 1fr 1fr;
  grid-template-rows: 80px;
  width: 90%;
  max-width: 800px;
  border: 5px solid $themes;
  border-radius: 15px;
  margin: 20px 0;
  font-family: Arial, Helvetica, sans-serif;
}
.header_logo {
  display: flex;
  justify-content: left;
  .logo_img {
    margin-left: 15px;
    width: 300px;
  }
}
.header_login {
  font-weight: bold;
  color: $themes;
  margin: 5px;
}
.header_signup {
  font-weight: bold;
  color: $themes;
  margin: 5px;
}

@media screen and (max-width: 750px) {
  #logHeader {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 80px 50px;
    .header_logo {
      grid-column: 1/3;
      grid-row: 1;
      justify-content: center;
      .logo_img {
        width: 220px;
        margin: 5px;
      }
    }
    .header_login {
      grid-column: 1/2;
      grid-row: 2;
    }
    .header_signup {
      grid-column: 2/3;
      grid-row: 2;
    }
  }
}
</style>
