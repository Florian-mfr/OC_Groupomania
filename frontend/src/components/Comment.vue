<template>
  <div id="Comment">
    <div class="post_comment">
      <span class="comment_name">{{ firstName }} {{ lastName }}</span>
      <span class="comment_text">
        {{ commentContent }}
      </span>
      <span class="comment_time"
        >{{ commentDate }}
        <button
          @click.prevent="deleteComment(id)"
          v-if="userId == this.$store.state.userId"
          class="comment_button"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <button @click.prevent="reportContent(id)" class="comment_button">
          <i class="fas fa-exclamation-triangle"></i>
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Comment",

  props: ["userId", "commentContent", "postId", "id", "commentDate"],

  data: () => {
    return {
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    deleteComment(id) {
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
    reportContent(id) {
      const object = {
        userId: this.$store.state.userId
      }
      axios
        .put(`http://localhost:3000/comment/report/${id}`, object,
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
    getUserComment(userId) {
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
  },
  mounted() {
    this.getUserComment(this.userId);
  },
};
</script>

<style lang="scss">
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
    display: flex;
    .comment_button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
      background-color: rgb(79, 175, 154);
      color: #fff;
      border-radius: 4px;
      margin: 5px;
      border: none;
      cursor: pointer;
      .fas {
        font-size: 1.1em;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .post_comment {
    flex-direction: column;
    .comment_name {
      text-align: center;
      width: 100%;
      min-height: 30px;
      padding: 0;
      margin: 5px;
    }
    .comment_text {
      min-height: 30px;
      width: 90%;
      padding: 10px 0 5px 0;
      margin: 5px;
    }
    .comment_time {
      width: 100%;
      min-height: 30px;
      padding: 0;
      margin: 5px 0 5px 35px;
      display: flex;
      .comment_delete {
        margin-left: 15px;
      }
    }
  }
}
</style>