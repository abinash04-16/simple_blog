<template>
    <section @click="moveto">
        <div class='item1'>
            <img :src="'http://localhost:3000'+image" >
        </div>
        <div class='item'>
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
        props:[ 'id', 'title', 'content', 'createdAt', 'from', 'image' ],
        methods:
        {
            moveto(){
                const userId = ''+this.id;
                this.$router.push('/blog/'+userId);
            }
        }
    }
</script>


<style scoped>
section{
    width: 70%;
    margin: 40px 1;
    background-color: #A1D6E2;
    border-radius: 8px;
    padding: 40px;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.26);
}
section img{
    box-shadow: 0 4px 8px black;
    width: 300px;
    height: 280px;
}
.item1
{
    float: left;
    padding-right: 20px;
}
.topContainer
{
    font-size: 30px;
    font-weight: 600;
    font-family: 'Courier New', Courier, monospace;
}
.bottomContainer
{
    position: absolute;
    bottom: 0px;
    right: 20px;
}
.middleContainer
{
    font-size: 20px;
}
.bottomContainer p
{
    float: right;
}
</style>