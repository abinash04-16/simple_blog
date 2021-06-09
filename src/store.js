import { createStore } from 'vuex';
//import router from './router.js';
import firebase from 'firebase';
import router from './router';
const store = createStore({
    state(){
        return{
            err_msg: '',
            err_code: '',
            err_status: false,
            user: null,
            currentUser: '',
            userMail: '',
            userId: null,
            isLoggedIn: false,
            blogs: [],
            ownBlogs: [],
            blog: [],
        };
    },
    mutations:
    {
        set_err(state, payload){
            state.err_status = true;
            state.err_msg = payload.msg;
            state.err_code = payload.code; 
        },
        off_err(state){
            state.err_status = false;
        },
        clearAll(state){
            state.blog = [];
            state.ownBlogs= [];
            state.blogs = [];
            state.isLoggedIn = false;
            state.userId = null;
            state.currentUser= '';
            state.userMail = '';
            state.user = null;
        },
        setMail(state, payload)
        {
            state.userMail = payload.mail;
        },
        retriveState(state)
        {
            firebase.auth().onAuthStateChanged(
                (user) => {
                    state.user = user;
                    state.userId = user.uid;
                    state.isLoggedIn = true;
                }

            );
        },
        getMyBlogs(state)
        {
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
            
        },
        getAllBlogs(state)
        {
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
        },
        
    },
    actions:{
       
        signUp(context,payload)
        {
            firebase.auth().createUserWithEmailAndPassword(payload.mail, payload.password)
            .then(() =>{
                router.push('/login');
            }).catch((err) => {
                context.commit('set_err', { msg: err.message, code: err.code,});
            });
            
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
            firebase.auth().signOut().then(() => {
                console.log("log out successfully");
                context.commit('clearAll');
                localStorage.removeItem('mail');
                localStorage.removeItem('password');
                router.push('/login');
            });
        }
    },
});

export default store;