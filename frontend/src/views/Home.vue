<template>
  <div id="home">
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
      <button @click='getAllPosts()' class="btn-publier">Publier</button>
    </div>
    <Post
      v-for="post in posts"
      :key="post.id"
      :userId="post.userId"
      :postDate="post.postDate"
      :content="post.content"
      :tittle="post.tittle"
      :id="post.id"
    ></Post>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Post from "../components/Post.vue";
import axios from 'axios'

export default {
  name: "home",
  data: () => {
    return {
      posts: [],
    }
  },
  components: {
    Header,
    Post,
  },
  methods: {
    getAllPosts() {
      axios
        .get("http://localhost:3000/posts/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$token}`,
          },
        })
        .then((res) => {
          console.log(res.data.result);
          this.posts = res.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
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
</style>