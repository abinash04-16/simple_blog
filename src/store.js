import { createStore } from 'vuex';
import axios from 'axios';
//import router from './router.js';
import firebase from 'firebase';
import router from './router';
const store = createStore({
    state(){
        return{
            user_id: null,
            user_mail: '',
            blogs: [],
            ownblogs:[],
        };
    },
    mutations:
    {

        clearAll(state)
        {
            state.user_id = null;
            state.user_mail = '';
            state.blogs = [];
            state.ownblogs = [];
        },
        setMail_andId(state, payload)
        {
            state.user_mail = payload.mail;
            state.user_id = payload.id;
        },
        retriveState()
        {
            /*
            firebase.auth().onAuthStateChanged(
                (user) => {
                    state.user = user;
                    state.userId = user.uid;
                    state.isLoggedIn = true;
                }

            );
            */
        },
        getMyBlogs()
        {
            /*
            axios.post('http://localhost:3000/myBlogs', {user_id: state.user_id }).then(
                (response) => {
                    console.log(response.data);
                    state.ownblogs = response.data.blog;
                }
            );
            */

            /*
            state.ownBlogs.splice(0,state.blogs.length);
            const db = firebase.database();
            const refer = db.ref().child('blogs');
            refer.orderByChild("userId").equalTo(state.userId).get().then((snapshot) => {
                snapshot.forEach((snap) => {
                    const sample = {
                        id: snap.val().id,
                        from: snap.val().userMail,
                        createdAt: snap.val().createdAt,
                        title: snap.val().title,
                        content: snap.val().maincontent,
                        imgUrl: snap.val().imgUrl,
                    };
                    state.ownBlogs.push(sample);
                });
            });
            */
            
        },
        getAllBlogs(state)
        {

            state.blogs.splice(0,state.blogs.length);
            axios.get( 'http://localhost:3000/blog/show' ).then(
                (response) => {
                    const temp = response.data.blog;
                    temp.forEach(t => {
                        console.log(t.image.url);
                        const sample = {
                            id: t.id,
                            title: t.title,
                            maincontent: t.maincontent,
                            content1: t.content1,
                            content2: t.content2,
                            user_id: t.user_id,
                            user_mail: t.user_mail,
                            createdAt: t.created_at,
                            updatedAt: t.updated_at,
                            image: t.image.url,
                        }        
                        state.blogs.unshift(sample);                
                    });
                }
            );

            /*
            firebase.database().ref("/blogs").get().then((snapshot) => {
                if(snapshot.exists)
                {
                    state.blogs.splice(0,state.blogs.length);
                    snapshot.forEach((snap) => {
                        const sample = {
                            id: snap.val().id,
                            from: snap.val().userMail,
                            createdAt: snap.val().createdAt,
                            title: snap.val().title,
                            content: snap.val().maincontent,
                            imgUrl: snap.val().imgUrl,
                        };
                        state.blogs.push(sample);
                    });

                }
            });
            */
        },
        
    },
    actions:{
       
        signUp(payload)
        {
            
            axios.post('http://localhost:3000/register', {email: payload.mail, password: payload.password}).then(
                (response) => {
                    if(response.data.status === 'success' )
                    {
                        router.push('login');
                    }
                }
            );

            /*firebase.auth().createUserWithEmailAndPassword(payload.mail, payload.password)
            .then(() =>{
                router.push('/login');
            }).catch((err) => {
                context.commit('set_err', { msg: err.message, code: err.code,});
            });
            */
            
        },
        login(context,payload)
        {
            
            firebase.auth().signInWithEmailAndPassword(payload.mail,payload.password).then(
                () => {
                    context.commit('setMail',{mail: payload.mail});
                    context.commit('retriveState');
                    context.commit('off_err');
                    localStorage.setItem( 'mail', payload.mail );
                    localStorage.setItem( 'password', payload.password );
                    router.push('/home');
                }).catch((err) => {
                    context.commit('set_err', { msg: err.message, code: err.code,});
                });
        },
        logout(context)
        {
            axios.get('http://localhost:3000/logout').then((response) => {
                if(response.data.result === 'success')
                {
                    console.log("log out successfully");
                    context.commit('clearAll');
                    localStorage.removeItem('mail');
                    localStorage.removeItem('password');
                    router.push('/login');
                }
            })
            
            /*
            firebase.auth().signOut().then(() => {
                console.log("log out successfully");
                context.commit('clearAll');
                localStorage.removeItem('mail');
                localStorage.removeItem('password');
                router.push('/login');
            });
            */
        }
    },
});

export default store;