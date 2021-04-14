<template>
  <div id="header">
    <div href="" class="header_logo">
      <router-link to="/home">
        <img src="../assets/logo_couleur.png" alt="" class="logo_img" />
      </router-link>
    </div>

    <span class="header_account">
      <router-link to="/account"> Mon compte </router-link>
    </span>
    <span class="header_disconnect" @click="logOut()">
      <router-link to="/"> Se déconnecter </router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logOut () {
      this.$store.commit('LOGOUT')
      this.$router.push({path: '/'})
    }
  },
};
</script>

<style lang='scss'>
*,
a {
  text-decoration: none;
  margin: 0;
  padding: 0;
}
#header {
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
.header_account {
  font-weight: bold;
  color: rgb(79, 175, 154);
  margin: 5px;
}
.header_disconnect {
  font-weight: bold;
  color: rgb(79, 175, 154);
  margin: 5px;
}

@media screen and (max-width: 750px) {
  #header {
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
    .header_account {
      grid-column: 1/2;
      grid-row: 2;
    }
    .header_disconnect {
      grid-column: 2/3;
      grid-row: 2;
    }
  }
}
</style>
