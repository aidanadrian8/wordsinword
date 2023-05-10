import { createApp } from 'vue'
import App from './App.vue'
import "./styles/main.scss";
import directives from './directives';


let app = createApp(App);
directives(app);
app.mount('#app')
