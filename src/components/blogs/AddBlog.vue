<template>
    <div class="myheader">
        <h2>Blogs</h2>
        <nav-list current="add"></nav-list>
    </div>

    <form @submit.prevent="addBlog">
        <router-link to="/home">X</router-link>
        <h2>Add your blog</h2>
        <div>
            <input type="text" name="title" placeHolder="Title" v-model.trim='title'>
        </div>
        <div>
            <textarea name="content" rows="2" cols="50" placeHolder="Enter your Content in Short" v-model.trim='maincontent'></textarea>
        </div>
        <div>
            <textarea name="content" rows="4" cols="50" placeHolder="Paragraph" v-model.trim='content1'></textarea>
        </div>
        <div>
            <textarea name="content" rows="4" cols="50" placeHolder="Paragraph(optional)" v-model.trim='content2'></textarea>
        </div>
        <div>
            <input type="file" name="title" placeHolder="select Image" accept="image/*" @change="fileSelected">
        </div>
        <div>
            <button @click="addBlog">add</button>
            
        </div>
        
    </form>
    <div v-if="loading" :class="loading ? 'loading' : null">
                <p>Loading......</p>
            </div>

    
</template>

<script>
    import firebase from 'firebase';
    import NavList from '../nav/NavList.vue';
    export default
    {
        components:{NavList,},
        data(){
            return{
                img: null,
                isValid: null,
                title:'',
                maincontent: '',
                content1: null,
                content2: null,
                temp: new Date().getTime(),
                img_upload: false,
                data_upload: false,
                img_url: null,
                loading:false,
            };
        },
        methods:
        {
            addBlog()
            {
                if( this.img != null && this.img != null && this.title !== '' && this.maincontent !== '' && this.content1 !== '')
                {
                            this.loading = true;
                    firebase.storage().ref(''+this.temp+".jpg").put(this.img).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => { 
                            this.img_url = url;
                        });
                        setTimeout(() => {
                            firebase.database().ref('blogs/'+ this.temp).set({
                                id: this.temp,
                                title:this.title,
                                maincontent:this.maincontent,
                                content1:this.content1,
                                content2: this.content2,
                                createdAt: new Date().toLocaleString(),
                                userId: this.$store.state.userId,
                                imgUrl: this.img_url,
                                userMail: this.$store.state.userMail}).then(() =>
                                { 
                                    console.log("finished");
                                    this.loading = false;
                                    this.$router.push('/home');
                            });
                        }, 2000);
                        
                    });
                }else{
                    this.isValid= false;
                }
            },
            fileSelected(event)
            {
                this.img = event.target.files[0];
                console.log(this.img);
            }
        }
    }
</script>

<style scoped>

.loading
{
    width: 100%;
    margin: 0 auto;
    position: absolute;
    bottom: 0px;
}
.loading p
{
    text-align: right;
    font-size: 20px;
}
form{
    width: 35%;
    margin: 0 auto;
    background-color: blueviolet;
    border-color: rgb(162, 89, 231);
    padding: 20px;
    margin-top: 100px;
}
h2
{
    text-align: center;
}
input{
    width: 100%;
    padding: 10px 0;
    border-radius: 4px;
    margin-bottom: 10px;
    border: none;
    color: black;
    border-bottom: 1px black solid;
    
}

textarea{
    width: 100%;
    padding: 10px 0;
    margin-bottom: 10px;
    border-radius: 4px;
    border: none;
    color: black;
    border-bottom: 1px black solid;
    
}
button
{
    width: 50%;
    margin-left:25%;
    padding: 5px;
}
a
{
    float: right;
    text-decoration: none;
    color: black;
    cursor: pointer;
    font-weight: bold;
    padding: 3px;
}

a:hover
{
    border: 1px solid black;
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

</style>
