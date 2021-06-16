<template>
    <div class="myheader">
        <h2>Blogs</h2>
        <nav-list current="my"></nav-list>
    </div>
    <router-view></router-view>
    <div v-if="blogs.length === 0" class='nothing'>
        <p> nothing to show </p>
    </div>
    <section v-else >
        <single-blog v-for="blog in blogs"
        :key='blog.id'
        :id='blog.id'
        :from='blog.user_mail'
        :createdAt="blog.createdAt"
        :title='blog.title'
        :image='blog.image'
        :content="blog.maincontent"></single-blog>
    </section>


</template>


<script>
    import NavList from '../nav/NavList.vue';
    import SingleBlog from './SingleBlog.vue';
    import axios from 'axios';
    export default {
        created()
        {
            axios.get(`http://localhost:3000/blog/myBlogs/${this.$store.state.user_id}`).then(
                (response) => {
                    console.log(response.data);
                    const temp = response.data.blog;
                    temp.forEach(t => {
                        const sample = {
                            id: t.id,
                            title: t.title,
                            maincontent: t.maincontent,
                            content1: t.content1,
                            content2: t.content2,
                            user_id: t.user_id,
                            user_mail: t.user_mail,
                            image: t.image.url,
                            createdAt: t.created_at,
                            updatedAt: t.updated_at,
                        }
                        this.blogs.unshift(sample);                
                    });
                }
            );

            console.log(this.blogs);

        },
        components:{
            NavList,
            SingleBlog,
        },
        data(){
            return{
                addButton: true,
                blogs: [],
            };
        },
    }
</script>


<style scoped>
.nothing
{
   width: 100%;
    height: 100vh;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: black;
    background-color: rgba(255, 255, 255, 0.63);
}
.nothing p{
    font-size: 25px;
    text-align: center;
    padding-top: 50vh;
}
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
  margin-bottom: 3%;
  width: 90%;
  position: relative;
}
</style>