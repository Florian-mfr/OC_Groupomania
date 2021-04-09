<template>
  <div id="logHeader">
    <router-link to="/home">
      <div class="header_logo">
        <img src="../assets/logo_couleur.png" alt="" class="logo_img" />
      </div>
    </router-link>
    <router-link to="/">
      <span class="header_login">Se connecter</span>
    </router-link>
    <router-link to="/signup">
      <span class="header_signup">S'inscrire</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "logHeader",
};
</script>

<style scoped lang='scss'>
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
  border: 5px solid rgb(79, 175, 154);
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
  color: rgb(79, 175, 154);
  margin: 5px;
}
.header_signup {
  font-weight: bold;
  color: rgb(79, 175, 154);
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
