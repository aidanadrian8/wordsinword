import { createApp } from 'vue'
import App from './App.vue'
import "./styles/main.scss";
import directives from './directives';
import store from './store'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css'
import { VueClipboard } from '@soerenmartius/vue3-clipboard';



let  localAuthToken = localStorage.auth_token;
let cookieExists = localAuthToken !== 'undefined' && localAuthToken !== null;
if(cookieExists) {
    const auth_token = localStorage.getItem("auth_token");
    const authTokenExists = auth_token !== "undefined" && auth_token !== null;
    if(authTokenExists){
        store.dispatch("loginUserWithToken", {auth_token})
    }
}
// console.log(cookieExists)


let app = createApp(App);
directives(app);
app.use(ToastPlugin);
app.use(VueClipboard);
app.use(store).mount('#app')
