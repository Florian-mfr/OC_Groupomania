<template>
  <div id="home">
    <!--<h1>Groupomania Social Network</h1>
    <div id="nav">
      <router-link to="/home">Accueil</router-link> |
      <router-link to="/profile">Mon profil</router-link>
    </div>-->
    <Header></Header>
    <div class="post-input">
      <input
        type="text"
        placeholder="Titre du post"
        class="input_tittle"
      /><br />
      <input
        type="text"
        placeholder="Ecrivez votre post ici !"
        class="input_text"
      /><br />
      <button class="btn-publier">Publier</button>
    </div>
    <div class="post">
      <div class="post_header">
        <p class="header_name">Prenom Nom</p>
        <h2 class="header_tittle">Titre du post</h2>
        <span class="header_time">le XX/XX à 00h00</span>
      </div>
      <p class="post_text">
        texte du post texte du post texte du post texte du post texte du post
      </p>
      <div class="post_comment">
        <p class="comment_name">Prenom Nom</p>
        <p class="comment_text">un commentaire</p>
        <span class="comment_time">le XX/XX à 00h00</span>
      </div>
    </div>
    <div class="post">
      <div class="post_header">
        <p class="header_name">Prenom Nom</p>
        <h2 class="header_tittle">Titre du post</h2>
        <span class="header_time">le XX/XX à 00h00</span>
      </div>
      <p class="post_text">
        texte du post texte du post texte du post texte du post texte du post
      </p>
      <div class="post_comment">
        <p class="comment_name">Prenom Nom</p>
        <p class="comment_text">un commentaire un commentaire un commentaire un commentaire un commentaire un commentaire</p>
        <span class="comment_time">le XX/XX à 00h00</span>
      </div>
      <div class="post_comment">
        <p class="comment_name">Prenom Nom</p>
        <p class="comment_text">un commentaire un commentaire</p>
        <span class="comment_time">le XX/XX à 00h00</span>
      </div>
      <div class="user_comment">
        <input type="text" placeholder=" Votre commentaire..." class="comment_input">
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  name: 'home',
  components: {
    Header
  }
}
</script>

<style scoped lang='scss'>
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.post-input {
  border-radius: 15px;
  background-color: rgb(79, 175, 154);
  width: 90%;
  max-width: 450px;
  margin: 10px 0;
  .input_tittle {
    border-style: none;
    border-radius: 5px;
    width: 90%;
    height: 20px;
    margin: 15px 0 5px 0;
    font-size: 1.2em;
  }
  .input_text {
    border-style: none;
    border-radius: 5px;
    width: 90%;
    height: 40px;
    margin: 5px 0;
    font-size: 1em;
  }
  .btn-publier {
    background-color: rgb(255, 255, 255);
    color: rgb(79, 175, 154);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 15px;
    margin: 10px;
    font-size: 1.3em;
  }
}
.post {
  margin: 20px;
  border: 5px solid rgb(79, 175, 154);
  border-radius: 15px;
  overflow: hidden;
  width: 90%;
  max-width: 800px;
  .post_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header_name {
      color: rgb(79, 175, 154);
      font-weight: bold;
      margin-left: 10px;
    }
    .header_tittle {
      font-size: 1.3em;
      margin: 0 5px;
    }
    .header_time {
      font-size: 0.8em;
      margin-right: 10px;
    }
  }
  .post_text {
    padding: 30px 0;
    margin: 5px 0 ;
    width: 100%;
    border-top: 2px solid rgb(79, 175, 154);
  }
  .post_comment {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    min-height: 50px;
    background-color: rgb(230, 230, 230);
    border-top: 2px solid rgb(79, 175, 154);
    .comment_name {
      color: rgb(79, 175, 154);
      font-weight: bold;
      font-size: 0.9em;
      width: 15%;
      min-height: 30px;
      height: 100%;
      padding: 10px 5px 5px 0;
      margin: 0 5px 0 10px;
    }
    .comment_text {
      background-color: #fff;
      border-radius: 10px;
      font-size: 1em;
      min-height: 30px;
      width: 70%;
      padding: 10px 0 5px 0;
      margin: 10px 5px;
    }
    .comment_time {
      font-size: 0.75em;
      width: 15%;
      height: 100%;
      min-height: 30px;
      padding: 10px 0 5px 5px;
      margin: 0 10px 0 5px;
    }
  }
  .user_comment {
    border-top: 3px solid rgb(79, 175, 154);
    background-color: rgb(230, 230, 230);
    padding: 10px 0;
    .comment_input {
      border-style: none;
      width: 50%;
      min-width: 200px;
      height: 30px;
      border-radius: 10px;
    }
  }
}
</style>