<template>
  <div id="account">
    <Header></Header>
    <h2>Gérer mon compte</h2>
    <div class="account_options">
      <div class="options_password">
        <span>{{firstName}} {{lastName}}</span>
        <span>Changer le mot de passe</span>
        <form action="">
          <label for="change password">Nouveau mot de passe :</label>
          <input type="password" v-model="newPassword" class="password_input" placeholder="Nouveau mot de passe"/>
          <button @click.prevent="changePassword(newPassword)" class="password-btn">Valider</button>
        </form>
      </div>
      <div class="options_delete">
        <button class="delete-btn" @click.prevent="deleteUser($store.state.userId)">Supprimer mon compte</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import axios from "axios"

export default {
  name: "account",
  components: {
    Header,
  },
  data: () => {
    return {
    firstName: '',
    lastName: '',
    newPassword: ''
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
    deleteUser(userId) {
      console.log(userId)
      axios
        .delete(`http://localhost:3000/user/delete/${userId}`, 
        { headers: {
                'Authorization': `token ${this.$store.state.token}`
                }})
        .then((res) => {
          console.log(res);
          this.$router.push({path:'/'})
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUser(userId) {
      axios
        .get(`http://localhost:3000/user/${userId}`, {
          headers: {
            Authorization: `token ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.firstName = res.data.result[0].firstname;
          this.lastName = res.data.result[0].lastname;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changePassword(newPassword) {
      let object = {
        password: newPassword,
        userId: this.$store.state.userId
      }
      axios.put('http://localhost:3000/user/changePassword', object, { headers: {
                'Authorization': `token ${this.$store.state.token}`
                }})
      .then(res => {
        console.log(res)
        alert('Mot de passe modifié avec succès')
      })
      .catch(error => {
        console.log(error)
      })

    }
  },
  mounted() {
    this.isLogged()
    this.getUser(this.$store.state.userId)
    
  }
};
</script>


<style scoped lang='scss'>
@import "../sass/variables";

#account {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-width: 900px;
  background-color: #fff;
}
.account_options {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 50px 0;
  margin: 20px;
  border: 5px solid $themes;
  border-radius: 15px;
  overflow: hidden;
  width: 90%;
  max-width: 800px;
  .options_password {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    span {
      font-size: 1.1em;
      font-weight: bold;
      margin: 10px 0;
    }
    form {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      label {
        margin: 10px 0;
      }
      input {
        border-style: none;
        border-radius: 5px;
        border: 2px solid $themes;
        height: 25px;
        margin: 5px 0;
      }
      .password-btn {
        border-style: none;
        background-color: $themes;
        color: #fff;
        padding: 10px 25px;
        border-radius: 15px;
        font-weight: bold;
        cursor: pointer;
        margin: 10px 0;
      }
    }
  }
  .delete-btn {
    border-style: none;
    background-color: rgb(206, 81, 81);
    color: #fff;
    padding: 10px 25px;
    border-radius: 15px;
    font-weight: bold;
    cursor: pointer;
    margin: 10px 0;
  }
}
@media screen and (max-width: 500px) {
  .account_options {
    flex-direction: column;
    .options_delete {
      width: 100%;
      padding-top: 20px;
      border-top: 2px solid $themes;
    }
  }
}
</style>