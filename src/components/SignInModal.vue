<template>
    <div class="myModal-backdrop">
        <div class="myModal bg-light">
            <header class="myModal-header">
                <h2 class="mb-0">Log In</h2>
                <button type="button" class="btn-close mb-0" @click="close">
                </button>
            </header>
            <section class="myModal-body">
                <p style="color: red" v-show="displayLoginFailed">Login Failed</p>
                <form @submit="onLogin" class="text-start" id="login">
                    <label for="email" class="form-label">
                        Email
                    </label>
                    <input type="email" name="email" id="email" class="form-control" v-model="loginEmail" required/>
                    <label for="password" class="form-label">
                        Password
                    </label>
                    <input type="password" name="password" id="password" class="form-control" v-model="loginPassword" required/>
                </form>
            </section>
            <footer class="myModal-footer">
                <div class="btn-group" role="group">
                    <button type="button" class="btn" @click="showSignUp">
                        Sign Up
                    </button>
                    <button type="submit" class="btn" form="login">
                        Log In
                    </button>
                </div>

            </footer>
        </div>
    </div>
</template>
<script>
import "@/store/index.js"
import { mapActions, mapGetters } from "vuex";

export default {
    name: 'SignInModal',
    computed: {
        ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"])
    },
    data() {
        return {
            loginEmail: "",
            loginPassword: "",
            displayLoginFailed: false
        }
    },
    methods: {
        ...mapActions(["registerUser", "loginUser", "logoutUser"]),
        close() {
            this.resetData();
            this.$emit('close');
        },
        showSignUp() {
            this.resetData();
            this.$emit('showSignUp');
        },
        onLogin(event) {
            event.preventDefault();
            let data = {
                user: {
                    email: this.loginEmail,
                    password: this.loginPassword
                }
            };
            this.$store.dispatch('loginUser', data)
            .then(response => {
                console.log(response);
                this.$emit('signInSuccessful');
                this.close();
                this.$toast.info("Logged In")
                this.resetData();
            })
            .catch(error => {
                console.log(error)
                this.$toast.warning("Login Failed!")
            })
        },
        resetData() {
            this.loginEmail = ""
            this.loginPassword = ""
            this.displayLoginFailed = false;
        }
    }
}
</script>
<style scoped>
.light-highlight {
    font-weight: bold;
}

.myModal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.myModal {
    border-radius: 22px;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 300px;
}
@media only screen 
   and (min-width : 320px) {
   .myModal {width: 94%; margin: auto;}
}
@media only screen 
   and (min-width : 768px) {
   .myModal {width: 500px;}
}

.myModal-header,
.myModal-footer {
    padding: 15px;
    display: flex;
}

.myModal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    justify-content: space-between;
}

.myModal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
}

.myModal-body {
    position: relative;
    padding: 20px 10px;
}

.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
}
</style>