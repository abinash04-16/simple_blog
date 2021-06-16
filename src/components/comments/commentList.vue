<template>
    <h2>Comments</h2>
        <div class="getComment">
            <input type="text" placeholder="Enter your Comment Here" v-model="inComment" >
            <button @click="addComment" class="btn">Comment</button>
        </div>

        <div class="allComments" v-if="comments.length !== 0">
            <single-comment v-for="comment in comments"
            :key="''+comment.commentId"
            :id="''+comment.commentId"
            :comment="comment.content"
            :postedAt="comment.postedAt"
            :userMail="comment.user_mail"></single-comment>
        </div>
    
</template>

<script>
    //import firebase from 'firebase';
    import singleComment from './singleComment.vue';
    import axios from 'axios';
    export default {
        created()
        {
            axios.get( `http://localhost:3000/comment/show/${this.$route.params.id}`).then((response) => {
                console.log(response);

                const comment1 = response.data.comments;

                comment1.forEach((c) => {
                    const sample = {
                        commentId: c.id,
                        postedAt: c.created_at,
                        content: c.content,
                        user_id: c.user_id,
                        blog_id: c.blog_id,
                        user_mail: c.user_mail,
                    };
                    this.comments.unshift(sample);
                });
            })

            /*
            const db = firebase.database();
            const refer = db.ref().child('comments/'+ this.$route.params.id);
            console.log(this.$route.params.id);
            refer.get().then((snapshot) => {
                snapshot.forEach((snap) =>{
                        const sample = {
                            comment: snap.val().comment,
                            commentId: snap.val().commentId,
                            postedAt: snap.val().postedAt,
                            userMail: snap.val().userMail,
                            blogId: snap.val().blogId,
                        };
                        this.comments.push(sample);
                    });
            });
            */
        },
        components:{
            singleComment
        },
        props:{
            blog_id: Number
        },
        data(){
            return{
                inComment: '',
                comments:[],
            };
        },
        methods:
        {
            addComment()
            {
                if(this.inComment !== '')
                {

                    axios.post( 'http://localhost:3000/comment/add', {
                        content: this.inComment,
                        user_id: this.$store.state.user_id,
                        user_mail: this.$store.state.user_mail,
                        blog_id: this.blog_id
                        } ).then((response) => 
                        {
                            console.log(response);
                        });
                        this.inComment='';
                        this.retriveComments();

                    /*
                    const temp = new Date().getTime();
                    const temp1 = ''+temp;
                    firebase.database().ref('comments/'+this.id+'/'+temp1).set({
                        postedAt: new Date().toLocaleString(),
                        comment: this.inComment,
                        userMail: this.email,
                        commentId: temp,
                        blogId: this.id,
                    });
                    this.inComment='';
                    this.retriveComments();
                    */
                }
            },

            retriveComments()
            {
                console.log(this.$route.params.id);
                this.comments.splice(0,this.comments.length);
                axios.get( `http://localhost:3000/comment/show/${this.$route.params.id}`).then((response) => {
                    console.log(response);

                    const comment1 = response.data.comments;

                    comment1.forEach((c) => {
                        const sample = {
                            commentId: c.id,
                            postedAt: c.created_at,
                            content: c.content,
                            user_id: c.user_id,
                            blog_id: c.blog_id,
                            user_mail: c.user_mail,
                        };
                        this.comments.unshift(sample);
                    });
                });


                /*
                const db = firebase.database();
                const refer = db.ref().child('comments/'+ this.id);
                console.log(this.id);
                refer.get().then((snapshot) => 
                {
                    snapshot.forEach((snap) =>
                    {
                        const sample =
                        {
                            comment: snap.val().comment,
                            commentId: snap.val().commentId,
                            postedAt: snap.val().postedAt,
                            userMail: snap.val().userMail,
                            blogId: snap.val().blogId,
                        };
                        this.comments.push(sample);
                        console.log(sample);
                    });
                });
                */
            }
        }
    }
</script>
<style scoped>
.getComment
{
    width: 60%;
    position: absolute;
}
.getComment button
{
    width: 10%;
    float: right;
    background-color: rgba(7, 118, 223, 0.966);
    border-radius: 5px;
    border: none;
    font-size: 17px;
    padding: 7px;
}

.getComment input
{
    width: 70%;
    float: left;
    font-size: 17px;
    border-radius: 6px;
    padding: 7px;
    background: rgba(7, 118, 223, 0.966);
}
.allComments
{
    margin-top:100px;
    margin-bottom: 20px;
    border: none;
}
</style>
