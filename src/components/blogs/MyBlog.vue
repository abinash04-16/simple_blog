<template>
    <div class="myheader">
        <h2>Blogs</h2>
        <nav-list current="my"></nav-list>
    </div>
    <router-view></router-view>
    <section>
        <single-blog v-for="blog in blogs"
        :key='blog.id'
        :id='blog.id'
        :from='blog.from'
        :createdAt="blog.createdAt"
        :title='blog.title'
        :imgUrl='blog.imgUrl'
        :content="blog.content"></single-blog>
    </section>


    <p v-if="blogs.length === 0"> nothing to show </p>
</template>


<script>
    import NavList from '../nav/NavList.vue';
    import SingleBlog from './SingleBlog.vue';
    export default {
        created()
        {
            this.$store.commit('getMyBlogs');

        },
        components:{
            NavList,
            SingleBlog,
        },
        data(){
            return{
                addButton: true,
                blogs: this.$store.state.ownBlogs,
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
    
}
.myheader p
{
    float: left;
    font-size: 30px;
    color: white;
    text-align: center;
    margin-left: 20%;
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
    margin-right: 10%;
    margin-top: 2%;

}
section {
  box-sizing: border-box;
  font-family: sans-serif;
  margin: 0 auto;
  height: 40vh;
  margin-top: 5%;
  width: 80%;
  position: relative;
}
</style>