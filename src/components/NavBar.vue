<template>
  <nav class="navbar navbar-expand-lg border-bottom shadow shadow-lg">
    <div class="container-fluid">
      <li class="nav-item dropdown-end" style="list-style:none;">
        <a class="navbar-brand btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">WordSack</a>
        <ul class="dropdown-menu">
          <div v-if="!isLoggedIn">
            <li><a class="dropdown-item" @click="showSignInModal">Log In</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" @click="showSignUpModal">Sign Up</a></li>
          </div>
          <div v-else>
            <li>
              <a class="dropdown-item" @click="logoutClicked">Log Out</a>
            </li>
          </div>
        </ul>
      </li>
      <button class="navbar-toggler btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <ToolTip class="nav-link" tooltip="1:A,E,I,O,U,L,N,S,T,R 2:D,G 3:B,C,M,P 4:F,H,V,W,Y 5:K 8:J,X 10:Q,Z"
              position="bottom"><i class="fa-solid fa-circle-info"></i></ToolTip>
          </li>
          <li class="nav-item">
            <ToolTip class="nav-link" position="bottom" tooltip="Help"><i class="fa-solid fa-circle-question"></i>
            </ToolTip>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <SignInModal v-show="SignInModalVisible" @close="closeSignInModal" @showSignUp="showSignUpModal" @signInSuccessful="signInSuccessful"/>
  <SignUpModal v-show="SignUpModalVisible" @close="closeSignUpModal" @showSignIn="showSignInModal" />
</template>
<script>
import ToolTip from './ToolTip.vue';
import SignInModal from './SignInModal.vue';
import SignUpModal from './SignUpModal.vue';
import "@/store/index.js"
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  components: {
    ToolTip,
    SignInModal,
    SignUpModal
  },
  data() {
    return {
      SignInModalVisible: false,
      SignUpModalVisible: false,
    }
  },
  methods: {
    ...mapActions(["logoutUser"]),
    logoutClicked(){
      this.$store.dispatch('logoutUser')
      .then(response => {
        console.log(response);
        this.$toast.info("Logged Out")
      })
      .catch(error => {
        console.log(error);
        this.$toast.error("Failed to log out")
      })
      
    },
    signInSuccessful() {

    },
    showSignInModal() {
      this.SignUpModalVisible = false;
      this.SignInModalVisible = true;
    },
    closeSignInModal() {
      this.SignInModalVisible = false;
    },
    showSignUpModal() {
      this.SignInModalVisible = false;
      this.SignUpModalVisible = true;
    },
    closeSignUpModal() {
      this.SignUpModalVisible = false;
    },
  }

}

</script>
<style></style>