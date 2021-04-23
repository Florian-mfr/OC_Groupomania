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
          v-model="firstName"
          placeholder="Prénom"
        />
      </div>
      <br />
      <label for="lastName">Nom :</label>
      <div>
        <input
          type="text"
          name="nom"
          id="lastName"
          v-model="lastName"
          placeholder="Nom"
        />
      </div>
      <br />
      <label for="email">Adresse e-mail :</label>
      <div>
        <input
          type="email"
          name="email"
          id="email"
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
          v-model="password"
          placeholder="Mot de passe"
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
//import useValidate from "@vuelidate/core"
//import { required, email, minLength, maxLenght} from 'vuelidate/lib/validators'
import logHeader from "../components/logHeader.vue";

export default {
  components: {
    logHeader,
  },
  data: () => ({
    //v$: useValidate(),
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }),
  /*validations: () => {
    return {
      firstName: {
      required,
      minLength: minLength(2),
      maxLenght: maxLenght(15),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    },
    lastName: {
      required,
      minLength: minLength(2),
      maxLenght: maxLenght(15),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    },
    email: {
      required,
      email
      },
    password: {
      required,
      minLength: minLength(2),
      maxLenght: maxLenght(15),
      syntaxe: value => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(value);
      }
    }
    }
    
 },*/
  methods: {
    signup() {
      const user = {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/user/signup", user)
        .then((res) => {
          this.$store.state.userId = res.data.userId
          this.$store.state.email = res.data.email
          this.$store.state.token = res.data.token
          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped lang='scss'>
@import "../sass/variables";

#signup {
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
  #firstName,
  #lastName,
  #email,
  #password {
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