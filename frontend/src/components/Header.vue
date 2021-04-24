<template>
  <div id="header">
    <h1 href="" class="header_logo">
      <router-link to="/home">
        <img src="../assets/logo_couleur.png" alt="logo" class="logo_img" />
      </router-link>
    </h1>
    <span class="header_admin" v-if="this.admin==1">
      <router-link to="/admin"> Admin </router-link>
    </span>

    <span class="header_account">
      <router-link to="/account"> Mon compte </router-link>
    </span>
    <span class="header_disconnect" @click="logOut()">
      <router-link to="/"> Se déconnecter </router-link>
    </span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Header",
  data: () => {
    return {
      admin: ''
    }
  },
  methods: {
    isLogged() {
        if(localStorage.getItem('token') == null) {
              this.$router.push({ path: "/" });
        } else {
          this.$store.state.token = localStorage.getItem('token')
          this.$store.state.userId = localStorage.getItem('userId')
        }
    },
    logOut () {
      this.$store.commit('LOGOUT')
      this.$router.push({path: '/'})
    },
    isAdmin() {
      axios
        .get(`http://localhost:3000/user/${this.$store.state.userId}`, {
          headers: {
            Authorization: `token ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.admin = res.data.result[0].isAdmin;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.isLogged()
    this.isAdmin()
  }
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
#header {
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
.header_admin {
  position: absolute;
  top: 10px;
  right: 45%;
  background-color: rgb(231, 171, 171);
  border-radius: 5px;
  padding: 5px;
  font-weight: bold;
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
  color: $themes;
  margin: 5px;
}
.header_disconnect {
  font-weight: bold;
  color: $themes;
  margin: 5px;
}

@media screen and (max-width: 750px) {
  #header {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 70px 40px;
    .header_logo {
      grid-column: 1/3;
      grid-row: 1;
      justify-content: center;
      margin: 0;
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
