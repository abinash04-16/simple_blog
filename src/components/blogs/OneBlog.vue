<template>
    <base-dialog title="Edit Blog" v-if="showedit" class="editDialog">

        <template v-slot:close>
            <button @click='closeUpdate' class='closeButton'>X</button>
        </template>
        <div>
            <div class="divInput">
                <label for='title'>Title</label>
                <input type="text" name="title" id='title' placeHolder="Title" class='titleInput' v-model.trim='tempTitle'>
            </div>
            <div class="divInput">
                <label for='maincontent'>main Content</label>
                <textarea name="maincontent" rows="4" cols="50" class='titleInput' placeHolder="Main Content in short form" v-model.trim='tempmainContent'></textarea>
            </div>
            <div class="divInput">
                <label for='content1'>content1</label>
                <textarea name="content1" rows="7" cols="50" class='titleInput' placeHolder="Content 1" v-model.trim='tempContent1'></textarea>
            </div>
            <div class="divInput">
                <label for='content2'>content2</label>
                <textarea name="content2" rows="7" cols="50" class='titleInput' placeHolder="Content 2" v-model.trim='tempContent2'></textarea>
            </div>
            <div class="divInput">
                <button @click="updateBlog"  class="divButton">update</button>
            </div>
        </div>
    </base-dialog>
    <section class="maincontainer">

        <p class="titleContainer">{{title}}</p>

        <p class="mainContentContainer">{{maincontent}}</p>
        <img :src="imgUrl" >
        <div class="floatclass">
            <button v-if="isValidToEdit" @click="showEdit">edit</button>
            <button v-if="isValidToEdit" @click="deleteBlog">Delete</button>
        </div>
        <div>
            <p>{{maincontent}}</p>
            <p>{{content1}}</p>
            <p>{{content2}}</p>
            <p v-if="!isValidToEdit">{{email}}</p>
            <p>Created At {{createdAt}}</p>
        </div>
    </section>

    <section class="commentClass">
        <comment-list :blog_id=id ></comment-list>
    </section>
</template>


<script>
    import commentList from '../comments/commentList.vue';
    //import firebase from 'firebase';
    import BaseDialog from '../UI/BaseDialog.vue';
import axios from 'axios';
    export default
    {
        components:{
            BaseDialog,
            commentList
        },
        created()
        {
            axios.get( `http://localhost:3000/blog/${parseInt(this.$route.params.id)}` ).then(
                (response) => {
                    this.id = response.data.blog.id;
                    this.title = response.data.blog.title;
                    this.maincontent = response.data.blog.maincontent;
                    this.content1 = response.data.blog.content1;
                    this.content2 = response.data.blog.content2;
                    this.email = response.data.blog.user_mail;
                    this.userId = response.data.blog.user_id;
                    this.createdAt = response.data.blog.created_at;
                    this.imgUrl = 'http://localhost:3000'+response.data.blog.image.url;
                    if( this.userId === this.$store.state.user_id )
                    {
                        this.isValidToEdit = true;
                    }
                    this.tempTitle = response.data.blog.title;
                    this.tempmainContent = response.data.blog.maincontent;
                    this.tempContent1 = response.data.blog.content1;
                    this.tempContent2 = response.data.blog.content2;
                }
            );

            /*
            firebase.database().ref().child('blogs').orderByChild("id").equalTo(parseInt(this.$route.params.id)).get()
            .then((snapshot) => {
                snapshot.forEach((snap) => {
                    this.id = snap.val().id;
                    this.email = snap.val().userMail;
                    this.createdAt = snap.val().createdAt;
                    this.title = snap.val().title;
                    this.maincontent = snap.val().maincontent;
                    this.content1 = snap.val().content1;
                    this.content2 = snap.val().content2;
                    this.userId = snap.val().userId;
                    this.imgUrl = snap.val().imgUrl;
                    if( this.userId === this.$store.state.userId )
                    {
                        this.isValidToEdit = true;
                    }
                    this.tempTitle = snap.val().title;
                    this.tempmainContent = snap.val().maincontent;
                    this.tempContent1 = snap.val().content1;
                    this.tempContent2 = snap.val().content2;
                });
            });
            */
        },
        data(){
            return{
                blog: this.$store.state.blog,
                id: null,
                email: '',
                createdAt: '',
                title: '',
                maincontent: '',
                content1: '',
                content2: '',
                userId: null,
                isValidToEdit: false,
                showedit: false,
                tempTitle: '',
                tempmainContent: '',
                tempContent1: '',
                tempContent2: '',
                updateInvalid: false, 
                imgUrl: '',
                //imgUrl: 'https://wallpapercave.com/wp/hBzSEjE.jpg',
            };
        },
        methods:{
            closeUpdate()
            {
                this.showedit=false;
            },
            showEdit()
            {
                this.showedit = true;
            },
            updateBlog()
            {
                
                axios.post( `http://localhost:3000/blog/update/${this.id}`, {
                    title: this.tempTitle,
                    maincontent: this.tempmainContent,
                    content1: this.tempContent1,
                    content2: this.tempContent2,
                }).then((response) => {
                    if(response.data.result === 'success')
                    {
                        console.log(response);
                        this.$router.push('/myBlogs');
                    }
                })
                /*
                if(this.tempTitle !== this.title || this.tempmainContent !== this.maincontent || this.tempContent1 !== this.content1 || this.tempContent2 !== this.content2 )
                {
                    firebase.database().ref('blogs/'+this.id).update({
                        'title': this.tempTitle,
                        'maincontent': this.tempmainContent,
                        'content1': this.tempContent1,
                        'content2': this.tempContent2,
                        });
                    this.$router.push('/myBlogs');
                } else {
                    this.updateInvalid = true;
                }
                */
            },
            deleteBlog()
            {

                axios.delete(  `http://localhost:3000/delete/${this.id}`).then((response) => {
                    if(response.data.result === 'success' )
                    {
                        this.$router.push('/home');
                    }
                })


                /*
                firebase.database().ref('blogs/'+this.id).remove();
                firebase.database().ref('comments/'+this.id).remove();
                this.$router.push('/myBlogs');
                */

            }
        }
    }
</script>

<style scoped>

.closeButton
{
    float: right;
    text-decoration: none;
    color: black;
    cursor: pointer;
    font-weight: bold;
    padding: 3px;
    padding-right: 10px;
    background: none;
    border:none;
    font-size: 20px;
}
.divInput button
{
    border: none;
    background: none;
    font-size: 18px;
    text-align: center;
    width: 20%;
    margin-left: 40%;
    padding-top: 10px;
    padding-bottom: 10px;
}
.divButton:hover
{
    border:1px solid whitesmoke;
    border-radius: 10px;
    cursor: pointer;
}
.divInput
{
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
}
.divInput label
{
    width: 30%;
    float: left;
    font-size: 18px;
}
.divInput input
{
    width: 90%;
    float: left;
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px;
}

.divInput textarea
{
    width: 90%;
    border-radius: 6px;
    font-size: 15px;
    height: 15vh;
    padding-top: 10px;
    padding-bottom: 5px;
}
.titleInput
{
    font-size: 20px;
    width: 90%;
    padding-left: 10px;
    margin-left: 5%;
}
.maincontainer
{
    width: 60%;
    margin-left: 20%;
}

.maincontainer img{
    width: 80%;
    margin-left: 10%;
    height: 70%;
}

.titleContainer
{
    font-size: 30px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
}
.mainContentContainer
{
    font-size: 15px;
}
.floatclass{
    padding: 4rem 0;
}
.floatclass p
{
    float: left;
    font-size: 27px;
}

.floatclass button{
    float: right;
    font-size: 23px;
    padding-left: 3%;
    padding-right: 3%;
    background: none;
    outline: none;
    border: 1px solid black;
    cursor: pointer;
}
.commentClass
{
    width: 60%;
    margin-left: 20%;
    margin-top: 50px;
    margin-bottom: 100px;
    padding: 2rem;
    box-shadow: 0 3px 30px rgba(0, 0, 0, 0.26);
    background-color:rgb(243, 245, 245);
    border-radius: 10px;
}
</style>