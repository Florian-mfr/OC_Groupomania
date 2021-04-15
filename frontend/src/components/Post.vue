<template>
  <div class="post">
    <div class="post_header">
      <p class="header_name">{{ firstName }} {{ lastName }}</p>
      <h2 class="header_tittle">{{ tittle }}</h2>
      <span class="header_time">{{ postDate }}</span>
    </div>
    <p class="post_text">
      {{ content }}
    </p>
    <Comment
    v-for="comment in comments"
      :key="comment.id"
      :userId="comment.userId"
      :commentDate="dateTimeDisplay(comment.commentDate)"
      :commentContent="comment.commentContent"
      :postId="comment.postId"
      :id="comment.id">
    </Comment>
    <div class="user_comment">
      <input
        v-model="commentContent"
        type="text"
        placeholder=" Votre commentaire..."
        class="comment_input"
      />
      <button
        @click.prevent="
          sendComment(id);
          getPostComments(id);
        "
        class="comment_btn"
      >
        Publier
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Comment from './Comment'

export default {
  name: "Post",

  props: ["userId", "content", "tittle", "id", "postDate"],

  components: {
    Comment
  },
  
  data: () => {
    return {
      commentContent: "",
      comments: [],
      firstName: "",
      lastName: "",
      NameComments: [],
    };
  },
  methods: {
    getUserPost(userId) {
      axios
        .get(`http://localhost:3000/users/${userId}`, {
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
    sendComment(id) {
      const commentData = {
        content: this.commentContent,
        postId: id,
        userId: this.$store.state.userId,
      };
      axios
        .post("http://localhost:3000/posts/comments/", commentData)
        .then((res) => {
          console.log(res);
          this.getPostComments(commentData.postId);
          this.commentContent = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPostComments(id) {
      axios.get(`http://localhost:3000/posts/comments/${id}`).then((res) => {
        console.log(res.data.result);
        this.comments = res.data.result;
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
    this.getUserPost(this.userId);
    this.getPostComments(this.id);
  },
};
</script>

<style scoped lang='scss'>
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
      font-size: 1.1em;
      margin-left: 10px;
    }
    .header_tittle {
      font-size: 1.3em;
      margin: 5px 0px;
    }
    .header_time {
      font-size: 0.8em;
      margin-right: 10px;
    }
  }
  .post_text {
    padding: 30px 0;
    margin: 5px 0;
    width: 100%;
    border-top: 2px solid rgb(79, 175, 154);
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
    .comment_btn {
      background-color: rgb(79, 175, 154);
      color: rgb(255, 255, 255);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      padding: 5px 15px;
      margin: 0 10px;
    }
  }
}
@media screen and (max-width: 600px) {
  .post_header {
    flex-direction: column;
    .header_name {
      margin: 5px;
    }
    .header_tittle {
      margin: 5px ;
    }
    .header_time {
      margin: 5px ;
    }
  }
}
</style>
