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
            <button class="button" @click.prevent="deletePost(post.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="button" @click.prevent="cancelReportPost(post.id)">
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
            <button class="button" @click.prevent="deleteComment(comment.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="button" @click.prevent="cancelReportComment(comment.id)">
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
    isLogged() {
        if(localStorage.getItem('token') == null) {
              this.$router.push({ path: "/" });
        } else {
          this.$store.state.token = localStorage.getItem('token')
          this.$store.state.userId = localStorage.getItem('userId')
        }
    },
    cancelReportComment(id) {
      axios
        .put(`http://localhost:3000/admin/comment/${id}`,
        { headers: {
                'Authorization': `token ${this.$store.state.token}`
                }})
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelReportPost(id) {
      axios
        .put(`http://localhost:3000/admin/post/${id}`,
        { headers: {
                'Authorization': `token ${this.$store.state.token}`
                }})
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost(id) {
      console.log(id)
      axios
        .delete(`http://localhost:3000/post/${id}`,
        { headers: {
                'Authorization': `token ${this.$store.state.token}`
                }})
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteComment(id) {
      console.log(id)
      axios
        .delete(`http://localhost:3000/comment/${id}`,
        { headers: {
                'Authorization': `token ${this.$store.state.token}`
                }})
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
  mounted() {
    this.isLogged()
  },
};
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
