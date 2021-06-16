<template>
    <section v-if="alreadyLogin" class="whiteBack">
        <div class='container1'>
            <p>Please Wait......</p>
        </div>
    </section>
    <section v-else>
        <div v-if="invalidInput">
            <base-dialog 
            v-if="err_status"
            :title='err_code'
            :msg='err_msg'>
                <div>
                    <button @click="backClick">back</button>
                </div>
            </base-dialog>
        </div>
        <div class='container'>
            <h2>Login</h2>
            <form @submit.prevent="submit">
                <div class="textbox">
                    <input type="text" name="mail" placeHolder="Mail" id='mail' v-model.trim='mail'/>
                </div>
                    <p v-if="temp_err_email">Invalid Mail</p>
                <div class="textbox">
                    <input type="password" name="Password" placeHolder="Password" id='Password' v-model.trim='password'/>
                </div>
                <p v-if='temp_err_password'>Password is Invalid or Incorrect</p>
                <div class="btn">
                    <button :disabled='submitClicked'>Submit</button>
                </div>
                <div class='altLink'>
                    <p>Create new Account, <router-link to="register">Register</router-link></p>
                </div>

            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import BaseDialog from '../UI/BaseDialog.vue';
    //import firebase from 'firebase';
    export default{
        components: { BaseDialog },
        mounted(){
            if(localStorage.getItem('mail') && localStorage.getItem('password') )
            {
                this.alreadyLogin = true;
                axios.post('http://localhost:3000/login', { email: localStorage.getItem('mail'), password: localStorage.getItem('password')}).then(
                    (response) => {
                        console.log(response.data.mail);
                        this.$store.commit('setMail_andId', { mail: response.data.mail, id: response.data.id })
                        this.$router.push('/home');
                    }
                );
            }
        },
        data(){
            return{
                alreadyLogin: false,
                mail: '',
                password: '',
                invalidInput: null,
                temp_err_email: false,
                temp_err_password: false,
                err_code: '',
                err_msg: '',
                err_status: false,
                submitClicked: false,
            };
        },
        methods:{
            submit(){
                if(!this.temp_err_email && !this.temp_err_password)
                {
                    this.submitClicked = true;
                    axios.post('http://localhost:3000/login', { email: this.mail, password: this.password}).then(
                        (response) => {
                            if(response.data.result === 'success')
                            {
                                localStorage.setItem('mail', this.mail);
                                localStorage.setItem('password', this.password);
                                console.log(response.data.mail);
                                this.$store.commit('setMail_andId', { mail: response.data.mail, id: response.data.id })
                                this.$router.push('/home');
                            }
                        }
                    );
                    /*
                    this.$store.dispatch('login',{
                        mail: this.mail,
                        password: this.password,
                    });

                    if( this.$store.state.err_status )
                    {
                        this.err_status = true;
                        this.err_code = this.$store.state.err_code;
                        this.err_msg = this.$store.state.err_msg;

                    }
                    */
                    
                }
            },
            backClick()
            {
                this.invalidInput = false;
            }
        },
        watch:
        {
            mail:function(val)
            {
                if( val === '' || !val.includes('@') )
                {
                    this.temp_err_email = true;
                }
                else 
                {
                    this.temp_err_email = false;
                }
            },
            password:function(val)
            {
                if( val.length < 6 || val === '')
                {
                    this.temp_err_password = true;
                }
                else {
                    this.temp_err_password = false;
                }
            }
        }
    }

</script>

<style scoped>

.whiteBack
{
    background-color: rgba(red, green, blue, 0.34);
}
.container1
{
    width: 100%;
    height: 100vh;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: black;
    background-color: rgba(255, 255, 255, 0.63);
}
.container1 p
{
    font-size: 25px;
    text-align: center;
    padding-top: 50vh;
}
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
    color: black;
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

.btn button
{
    background: none;
    outline: none;
    border: 2px solid #333;
    padding: 10px;
    color: black;
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
    color: red;
    font-weight: 600;
    font-family: Georgia, 'Times New Roman', Times, serif;
    text-decoration: none;
    cursor: pointer;
}
</style>