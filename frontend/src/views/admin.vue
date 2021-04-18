<template>
  <div id="admin">
    <Header></Header>
    <div class="div_btn">
      <button class="display_btn" @click.prevent="getReportedPosts()">
        Afficher les posts signaler
      </button>
      <button class="display_btn" @click.prevent="getReportedComments()">
        Afficher les commentaires signaler
      </button>
    </div>
    <h1>Posts :</h1>
    <div class="div_display">
      <div class="post" v-for="post in posts" :key="post">
        <div class="post_header">
          <span class="header_id">userId: {{ post.userId }}</span>
          <span class="header_time">{{ dateTimeDisplay(post.postDate) }} </span>
          <div class="header_button">
            <button class="button">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="button" @click.prevent="reportContent(id)">
              <i class="fas fa-exclamation-triangle"></i>
            </button>
            <button class="button">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="post_content">
          <h2 class="content_tittle">{{ post.tittle }}</h2>
          <p class="content_text">{{ post.content }}</p>
        </div>
      </div>
      <h1>Commentaires :</h1>
      <div class="comment" v-for="comment in comments" :key="comment">
        <div class="comment_header">
          <span class="header_id">userId: {{ comment.userId }}</span>
          <span class="header_time">{{ dateTimeDisplay(comment.commentDate) }} </span>
          <div class="header_button">
            <button class="button">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="button" @click.prevent="reportContent(id)">
              <i class="fas fa-exclamation-triangle"></i>
            </button>
            <button class="button">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="comment_content">
          <h2 class="content_tittle">{{ comment.tittle }}</h2>
          <p class="content_text">{{ comment.commentContent }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import axios from "axios";

export default {
  name: "admin",
  data: () => {
    return {
      posts: [],
      comments: [],
    };
  },
  components: {
    Header,
  },
  methods: {
    getReportedPosts() {
      axios
        .get(`http://localhost:3000/admin/post`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
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
    getReportedComments() {
      axios
        .get(`http://localhost:3000/admin/comment`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          console.log(res.data.result);
          this.comments = res.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dateTimeDisplay(dateString) {
      let chars = dateString.split("");
      let commentDate =
        "le " +
        chars[8] +
        chars[9] +
        "/" +
        chars[5] +
        chars[6] +
        "/" +
        chars[2] +
        chars[3] +
        " à " +
        chars[11] +
        chars[12] +
        "h" +
        chars[14] +
        chars[15];
      return commentDate;
    },
  },
  mounted() {},
};
/*<div class="post" v-for="post in posts" :key="post.id">
        <div class="post_header">
          <span class="header_id">userId: {{ post.userId }}</span>
          <span class="header_time">{{ post.postDate }} </span>
          <button class="header_button">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button class="header_button" @click.prevent="reportContent(id)">
            <i class="fas fa-exclamation-triangle"></i>
          </button>
        </div>
        <div class="post_content">
            <h2 class="content_tittle">{{ post.tittle }}</h2>
            <p class="content_text">{{ post.content }}</p>
        </div>
    </div>*/
</script>

<style lang='scss'>
#admin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px;
  background-color: #fff;
  .div_btn {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 300px;
    .display_btn {
      background-color: rgb(79, 175, 154);
      color: rgb(255, 255, 255);
      border: none;
      height: 60px;
      width: 120px;
      border-radius: 5px;
      cursor: pointer;
      padding: 5px 15px;
      margin: 5px 10px;
    }
  }
  .post {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px;
    border: 5px solid rgb(79, 175, 154);
    border-radius: 15px;

    .post_header {
      display: flex;
      flex-direction: column;
      margin: 5px;
      border-right: 2px solid rgb(79, 175, 154);
      .header_id,
      .header_time {
        margin: 5px;
      }
      .header_button {
        display: flex;
        justify-content: space-around;
        margin: 5px;
        .button {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          padding: 6px;
          background-color: rgb(79, 175, 154);
          color: #fff;
          border-radius: 4px;
          margin: 5px;
          border: none;
          cursor: pointer;
        }
      }
    }
    .post_content {
      margin: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .content_tittle,
      .content_text {
        margin: 5px;
      }
    }
  }
  .comment {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px;
    border: 5px solid rgb(79, 175, 154);
    border-radius: 15px;

    .comment_header {
      display: flex;
      flex-direction: column;
      margin: 5px;
      border-right: 2px solid rgb(79, 175, 154);
      .header_id,
      .header_time {
        margin: 5px;
      }
      .header_button {
        display: flex;
        justify-content: space-around;
        margin: 5px;
        .button {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          padding: 6px;
          background-color: rgb(79, 175, 154);
          color: #fff;
          border-radius: 4px;
          margin: 5px;
          border: none;
          cursor: pointer;
        }
      }
    }
    .comment_content {
      margin: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .content_tittle,
      .content_text {
        margin: 5px;
      }
    }
  }
}
</style>
