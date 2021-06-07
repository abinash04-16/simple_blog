<template>
    <section>
        <p>from {{userMail}},</p>
        <p>{{comment}}</p>
        <p class="floatRight">{{postedAt}}</p>
    </section>
</template>


<script>
    export default{
        props:{
            id: String,
            comment: String,
            userMail: String,
            postedAt: String,
        },
    }
</script>


<style scoped>

section
{
    background-color: rgb(192, 191, 189);
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0 4px 8px black;
    width: 100%;
}
section p{
    width: 80%;
    margin-left: 10px;
}
.floatRight
{
    font-size: 10px;
    font-weight: 600;
}
</style>