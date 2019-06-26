<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="create-post">Say Something...</label>
      <br>
      <textarea v-model="text" placeholder="Create a post"></textarea>
      <button v-on:click="createPost">Post</button>
    </div>
    <hr>
    <p class="error" v-if="err">{{err}}</p>

    <div class="post-container">
      <div
        class="post"
        v-for="(post,index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >
        <p class="date">{{`${post.createdAt.getDate()}/${post.createdAt.getMonth()+1}/${post.createdAt.getFullYear()}`}}</p>
        <p class="text">{{post.text}}</p>
        <button v-on:click="deletePost(post._id)">Delete</button>
        <button v-on:click="updatePost(post._id)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      err: "",
      text: ""
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.err = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
      this.text = "";
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    async updatePost(id) {
      await PostService.updatePost(id, this.text);
      this.posts = await PostService.getPosts();
      this.text = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 30px 30px 30px;
  margin-bottom: 15px;
  white-space: pre-wrap;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 0;
  margin-top: 0;
}

p.date {
  font-size: 12px;
  color: grey;
  text-align: right;
  margin: 1em;
}

button {
  background-color: #4caf50; /* Green */
  border-radius: 4px;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 1em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
}

textarea {
  width: 400px;
  height: 100px;
  border-radius: 4px;
}
</style>
