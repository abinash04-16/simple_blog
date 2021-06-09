<template>
    <div>
    <router-link to="/home" :class=" current === 'home' ? 'selected' : null ">Home</router-link>
    <router-link to="/myBlogs" :class=" current === 'my' ? 'selected' : null ">My Blogs</router-link>
    <router-link to="/addBlog" :class=" current === 'add' ? 'selected' : null ">Add Blog</router-link>
    <button @click="logout">Log Out</button>
    </div>
</template>

<script>
    export default {
        props:['current'],
        methods:{
            logout()
            {
                this.$store.dispatch('logout');
            }
        }
    }
</script>


<style scoped>
a{
    padding: 10px;
    color: rgb(209, 138, 138);
    font-size: 20px;
    text-decoration: none;
}

button{
    padding: 10px;
    color: rgb(209, 138, 138);
    font-size: 20px;
    text-decoration: none;
    background: black;
    border: none;
}

button:hover{
    cursor: pointer;
    border: 1px solid white; 
}

.selected
{
    border: 2px white solid;
    color: white;
}
</style>
