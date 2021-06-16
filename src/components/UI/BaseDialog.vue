<template>
    <section>
        <dialog open class='container'>
            <div>
                <slot name='close'></slot>
            </div>
            <div class="title">
                <h2>{{title}}</h2>
            </div>
            <div class="msg">
                <p>{{msg}}</p>
            </div>
            <slot></slot>
        </dialog>
    </section>
</template>

<script>
    export default{
        props:[ 'title', 'msg']
    }
</script>
<style scoped>
dialog {
  position: fixed;
  width: 70%;
  height: 85%;
  top: 10%;
  z-index: 1;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  overflow: hidden;
  background-color: #d8b8e2;
  border: 2px solid black;
}

.title
{
    text-align: center;
}

</style>
