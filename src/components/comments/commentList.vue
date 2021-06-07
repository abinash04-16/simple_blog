<template>
    <h2>Comments</h2>
    <div class="commentInput">
        <input type="text" placeholder="Enter your Comment Here" v-model="inComment" >
        <button @click="addComment">Add</button>
        <div class="allComments" v-if="comments.length !== 0">
        <single-comment v-for="comment in comments"
        :key="''+comment.commentId"
        :id="''+comment.commentId"
        :comment="comment.comment"
        :postedAt="comment.postedAt"
        :userMail="comment.userMail"></single-comment>
        </div>
    </div>
    
</template>

<script>
    import firebase from 'firebase';
    import singleComment from './singleComment.vue';
    export default {
        created(){
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
        },
        components:{
            singleComment
        },
        props:{
            id: String,
            email: String,
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
                }
            },

            retriveComments()
            {
                this.comments.splice(0,this.comments.length);
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
            }
        }
    }
</script>
<style scoped>
.commentInput input
{
    width: 100%;
    font-size: 17px;
    border-radius: 6px;
    padding: 7px;
    background: rgba(7, 118, 223, 0.966);
}
.allComments
{
    position: relative;
    margin-top:30px;
    margin-bottom: 20px;
    border: none;
}
</style>
