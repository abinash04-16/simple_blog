<template>
    <div class="myheader">
        <h2>Blogs</h2>
        <nav-list current="home"></nav-list>
    </div>
    <router-view></router-view>
    <section>
        <single-blog v-for="blog in blogs"
        :key='blog.id'
        :id='blog.id'
        :from='blog.user_mail'
        :createdAt="blog.createdAt"
        :title='blog.title'
        :image=blog.image
        :content="blog.maincontent"></single-blog>
    </section>
</template>


<script>
    import NavList from '../nav/NavList.vue';
    import SingleBlog from './SingleBlog.vue';
    export default {
        created()
        {
            this.$store.commit('getAllBlogs');
            console.log(this.$store.state.blogs);

        },
        components:{
            NavList,
            SingleBlog,
        },
        data(){
            return{
                addButton: true,
                blogs: this.$store.state.blogs,
            };
        },
    }
</script>


<style scoped>

button
{
    width: 50%;
    margin-left:25%;
}
.myheader
{
    overflow: hidden;
    position: fixed;
    z-index: 1;
    background-color: black;
    top: 0;
    text-decoration: none;
    left: 0;
    width: 100%;
    padding: 5rem 1;
    padding-bottom: 15px;
    
}
.myheader h2
{
    float: left;
    font-size: 30px;
    color: white;
    text-align: center;
    margin-left: 20%;
}
.myheader div{
    float: right;
    margin-top: 2%;
    margin-right: 10%;

}
section {
  box-sizing: border-box;
  font-family: sans-serif;
  margin: 0 auto;
  height: 40vh;
  margin-top: 5%;
  margin-bottom: 3%;
  width:90%;
  position: relative;
}
</style>