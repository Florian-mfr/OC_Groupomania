<template>
  <div>
    <div class="post">
      <div class="post_header">
        <p class="header_name">Prenom Nom</p>
        <h2 class="header_tittle">{{ tittle }}</h2>
        <span class="header_time">{{ postDate }}</span>
      </div>
      <p class="post_text">
        {{ content }}
      </p>
      <div v-for="comment in comments" :key="comment.id" class="post_comment">
        <p class="comment_name">Prenom Nom</p>
        <p class="comment_text">
          {{comment.commentContent}}
        </p>
        <span class="comment_time">{{dateTimeDisplay(comment.commentDate)}}</span>
      </div>
      <div class="user_comment">
        <input
          v-model="commentContent"
          type="text"
          placeholder=" Votre commentaire..."
          class="comment_input"
        />
        <button @click.prevent="sendComment(id); getPostComments(id)" class="comment_btn">Publier</button>
        <button @click.prevent="getPostComments(id)" class="comment_btn">get comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["userId", "content", "tittle", "id", "postDate"],
  name: "Post",

  data: () => {
    return {
      commentContent: '',
      comments:[]
    };
  },
  methods: {
    sendComment(id) {
      const commentData = {
        content: this.commentContent,
        postId: id,
        userId: 1,
      };
      axios
        .post("http://localhost:3000/posts/comments/", commentData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPostComments(id) {
      axios.get(`http://localhost:3000/posts/comments/${id}`)
      .then(res => {
        console.log(res)
        this.comments = res.data.result
      })
    },
    dateTimeDisplay(dateString) {
      let chars = dateString.split('')
      let commentDate = "le "+chars[8]+chars[9]+'/'+chars[5]+chars[6]+'/'+chars[2]+chars[3]+' à '+chars[11]+chars[12]+'h'+chars[14]+chars[15]
      return commentDate
    }
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
    margin: 5px 0;
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
</style>
