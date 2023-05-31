<template>
    <div class="myModal-backdrop">
        <div class="myModal bg-light">
            <header class="myModal-header">
                <h2 class="mb-0">Sign Up</h2>
                <button type="button" class="btn-close mb-0" @click="close">
                </button>
            </header>
            <section class="myModal-body">
                <p style="color: red" v-show="displaySignUpFailed">Sign up Failed</p>
                <form action="post" class="text-start">
                    <label for="email" class="form-label">
                        Email
                    </label>
                    <input type="email" name="email" id="email" class="form-control" required v-model="signUpEmail" />
                    <label for="password" class="form-label">
                        Password
                    </label>
                    <input type="password" name="password" id="password" class="form-control" required
                        v-model="signUpPassword"/>
                        <label for="password" class="form-label">
                        Confirm Password
                    </label>
                    <input type="password" name="password" id="password" class="form-control" required
                        v-model="signUpPasswordConfirm"/>
                </form>
            </section>
            <footer class="myModal-footer">
                <div class="btn-group" role="group">
                    <button type="button" class="btn" @click="showSignIn">
                        Log In
                    </button>
                    <button type="button" class="btn" @click="onSignUp">
                        Sign Up
                    </button>

                </div>
            </footer>
        </div>
    </div>
</template>
<script>
import "@/store/index.js"
import { mapActions } from 'vuex';

export default {
    name: 'SignUpModal',
    data() {
        return {
            signUpEmail: "",
            signUpPassword: "",
            signUpPasswordConfirm: "",
            displaySignUpFailed: false
        }
    },
    methods: {
        ...mapActions(["registerUser"]),
        close() {
            this.$emit('close');
        },
        showSignIn() {
            this.$emit('showSignIn');
        },
        onSignUp(event) {
            if(this.signUpPassword != this.signUpPasswordConfirm) {
                this.$toast.warning("Passwords don't match");
            }
            else{
            event.preventDefault();
            let data = {
                user: {
                    email: this.signUpEmail,
                    password: this.signUpPassword
                }
            };
            this.$store.dispatch('registerUser', data)
                .then(response => {
                    console.log(response);
                    this.$emit('signUpSuccessful');
                    this.close();
                    this.$toast.info("Signed Up Successfully!")
                    this.resetData();
                })
                .catch(error => {
                    console.log(error)
                    this.displaySignUpFailed = true
                })
            }
        },
        resetData() {
            this.signUpEmail = "",
                this.signUpPassword = ""
            this.displaySignUpFailed = false
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