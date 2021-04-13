<template>
  <div id="home">
    <Header></Header>
    <div class="post-input">
      <input
        v-model="tittle"
        type="text"
        placeholder="Titre du post"
        class="input_tittle"
      /><br />
      <input
        v-model="content"
        type="text"
        placeholder="Ecrivez votre post ici !"
        class="input_text"
      /><br />
      <button @click="createPost()" class="btn-publier">Publier</button>
    </div>
    <Post
      v-for="post in posts"
      :key="post.id"
      :userId="post.userId"
      :postDate="dateTimeDisplay(post.postDate)"
      :content="post.content"
      :tittle="post.tittle"
      :id="post.id"
    ></Post>
  </div>
</template>

<script>
import Header from "../components/Header";
import Post from "../components/Post";
import axios from 'axios'

export default {
  name: "home",
  data: () => {
    return {
      posts: [],
      tittle:"",
      content:"",
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
    createPost() {
      const postData = {
        tittle: this.tittle,
        content: this.content,
        userId: 1
      }
      axios.post("http://localhost:3000/posts/", postData)
      .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dateTimeDisplay(dateString) {
      let chars = dateString.split('')
      let postDate = "le "+chars[8]+chars[9]+'/'+chars[5]+chars[6]+'/'+chars[2]+chars[3]+' à '+chars[11]+chars[12]+'h'+chars[14]+chars[15]
      return postDate
    }
  },
  mounted() {
    this.getAllPosts()
  }
};
</script>

<style lang='scss'>
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