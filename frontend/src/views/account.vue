<template>
  <div id="account">
    <Header></Header>
    <h2>Gérer mon compte</h2>
    <div class="account_options">
      <div class="options_password">
        <span>Changer le mot de passe</span>
        <form action="">
          <label for="change password">Nouveau mot de passe :</label>
          <input v-model="newPassword" type="text" class="password_input" />
          <button class="password-btn">Valider</button>
        </form>
      </div>
      <div class="options_delete">
        <button class="delete-btn">Supprimer mon compte</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "account",
  /*data: () => {
        newPassword: "",
    },*/
  components: {
    Header,
  },
};
</script>


<style scoped lang='scss'>
#account {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.account_options {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 50px 0;
  margin: 20px;
  border: 5px solid rgb(79, 175, 154);
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
        border: 2px solid rgb(79, 175, 154);
        height: 25px;
        margin: 5px 0;
      }
      .password-btn {
        border-style: none;
        background-color: rgb(79, 175, 154);
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
      border-top: 2px solid rgb(79, 175, 154);
    }
  }
}
</style>