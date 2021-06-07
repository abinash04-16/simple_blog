<template>
    <base-dialog title="Edit Blog" v-if="showedit" class="editDialog">
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
            </div><div class="divInput">
                <button @click="closeUpdate"  class="divButton">close</button>
            </div>
        </div>
    </base-dialog>
    <section class="maincontainer">
        <img :src="imgUrl" >
        <div class="floatclass">
            <p>{{title}}</p>
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
        <comment-list :id="''+id" :email="email"></comment-list>
    </section>
</template>


<script>
    import commentList from '../comments/commentList.vue';
    import firebase from 'firebase';
    import BaseDialog from '../UI/BaseDialog.vue';
    export default
    {
        components:{
            BaseDialog,
            commentList
        },
        created()
        {

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
                currentUserId: this.$store.state.userId,
                isValidToEdit: false,
                showedit: false,
                tempTitle: '',
                tempmainContent: '',
                tempContent1: '',
                tempContent2: '',
                updateInvalid: false, 
                imgUrl: null,
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
            },
            deleteBlog()
            {
                firebase.database().ref('blogs/'+this.id).remove();
                firebase.database().ref('comments/'+this.id).remove();
                this.$router.push('/myBlogs');

            }
        }
    }
</script>

<style scoped>
.divButton
{
    font-size: 18px;
    text-align: center;
    width: 30%;
    margin-left: 35%;
}
.divInput
{
    padding-top: 1vh;
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