<template>
  <div id="Comment">
    <div class="post_comment">
      <span class="comment_name">{{firstName}} {{lastName}}</span>
      <span class="comment_text">
        {{ commentContent }}
      </span>
      <span class="comment_time">{{commentDate}}</span>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Comment",

    props: ["userId", "commentContent", "postId", "id", "commentDate"],

    data: () => {
        return {
            firstName: '',
            lastName: ''
        }
    },
    methods: {
    getUserComment(userId) {
      axios
        .get(`http://localhost:3000/users/${userId}`, {
          headers: {
            Authorization: `token ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.firstName = res.data.result[0].firstname
          this.lastName = res.data.result[0].lastname
          //console.log(firstName + ' ' + lastName)
          //return firstName + ' ' + lastName
        })
        .catch((error) => {
          console.log(error);
        });
    },
    },
    mounted() {
        this.getUserComment(this.userId)
    },
    
}
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
    }
  }
</style>