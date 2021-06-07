<template>
    <div class='container'>
        <h2>Register </h2>
        <form @submit.prevent="submit">
            <div class="textbox">
                <input type="text" name="mail" placeHolder="Mail" id='mail' v-model.trim='mail'/>
            </div>
            <div class="textbox">
                <input type="password" name="Password" placeHolder="Password" id='Password' v-model.trim='password'/>
            </div>
            <p v-if="invalidInput">inputs are InValid</p>
            <div>
                <button>Submit</button>
            </div>
            <div class='altLink'>
                <p>Already have an Account, <router-link to="login">Login</router-link></p>
            </div>

        </form>
    </div>
</template>

<script>
    //import firebase from 'firebase';
    export default{
        data(){
            return{
                mail: '',
                password: '',
                invalidInput: null,
            };
        },
        methods:{
            submit(){
                if(this.mail === "" || this.password === "" || this.password.length < 6 || !this.mail.includes('@'))
                {
                    this.invalidInput = true;
                }
                else
                {
                    this.$store.dispatch('signUp',{
                        mail: this.mail,
                        password: this.password,
                    })                    
                }
            },
        }
    }

</script>

<style scoped>
.container
{
    width: 25%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
}
.container h2
{
    float: left;
    font-size: 37px;
    margin-bottom: 30px 0;
    padding-bottom: 20px;
    border-bottom: 3px solid rgb(81, 255, 0);
}

.textbox
{
    width: 100%;
    padding: 10px;
    overflow: hidden;
    margin: 25px 0;
    border-bottom: 1px solid #333;
}

.textbox input{
    border: none;
    outline: none;
    font-size: 18px;
    background: none;
    color: #000;
}

.container button
{
    background: none;
    outline: none;
    border: 2px solid #333;
    padding: 10px;
    color: white;
    width: 100%;
    text-transform: uppercase;
    font-size: 20px;
    cursor: pointer;
    margin: 12px;
}
.altLink
{
    margin: 20px 0;
    text-align: center;
    font-size: 18px;
}
.altLink p
{
    color: black;
}

.altLink a
{
    color: white;
    text-decoration: none;
    cursor: pointer;
}
</style>