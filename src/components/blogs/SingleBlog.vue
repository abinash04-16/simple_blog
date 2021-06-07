<template>
    <section @click="moveto">
        <img :src="imgUrl" >
        <div>
            <p class="topContainer">{{title}}</p>
            <p class="middleContainer">{{content}}</p>
            <div class="bottomContainer">
                <p>| Created At {{createdAt}}</p>
                <p>Created By {{from}} |</p>
            </div>
        </div>
    </section>
</template>

<script>
    
    export default{
        props:[ 'id', 'title', 'content', 'createdAt', 'from', 'imgUrl' ],
        methods:
        {
            moveto(){
                const userId = '/'+this.id;
                this.$router.push(userId);
            }
        }
    }
</script>


<style scoped>
section{
    height: 300px;
    width: 70%;
    margin: 40px 1;
    padding: 40px;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.26);
}
section img{
    float: left;
    box-shadow: 0 4px 8px black;
    width: 300px;
    height: 280px;
}
section div
{
    color: white;
}
.topContainer
{
    font-size: 30px;
    font-weight: bold;
}

.middleContainer
{
    font-size: 25px;
}
.bottomContainer
{
    position: absolute;
    bottom: 0px;
    right: 0px;
}
.bottomContainer p {
    float: right;
}
</style>