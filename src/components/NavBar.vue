<template>
  <nav class="navbar navbar-expand-lg border-bottom shadow shadow-lg">
    <div class="container-fluid">
      <li class="dropdown-end" style="list-style:none;">
        <a class="navbar-brand btn" @click="proTip" role="button" aria-expanded="false">WordSack</a>
      </li>
      <button class="navbar-toggler btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-user me-2"></i>Account</a>
        <ul class="dropdown-menu ms-2">
          <div v-if="!isLoggedIn">
            <li><a class="dropdown-item" @click="showSignInModal">Log In</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" @click="showSignUpModal">Sign Up</a></li>
          </div>
          <div v-else>
            <li>
              <a class="dropdown-item" @click="showOptionsModal">Options</a>
            </li>
            <li>
              <a class="dropdown-item" @click="logoutClicked">Log Out</a>
            </li>
            
          </div>
        </ul>
          </li>
          <li class="nav-item">
            <ToolTip class="nav-link" tooltip="1:A,E,I,O,U,L,N,S,T,R 2:D,G 3:B,C,M,P 4:F,H,V,W,Y 5:K 8:J,X 10:Q,Z"
              position="bottom"><i class="fa-solid fa-circle-info me-2"></i>Letter Values</ToolTip>
          </li>
          <li class="nav-item">
            <ToolTip class="nav-link" position="bottom" tooltip="Help" @click="showHelpModal"><i class="fa-solid fa-circle-question me-2"></i>Help
            </ToolTip>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <SignInModal v-show="SignInModalVisible" @close="closeSignInModal" @showSignUp="showSignUpModal" @signInSuccessful="signInSuccessful"/>
  <SignUpModal v-show="SignUpModalVisible" @close="closeSignUpModal" @showSignIn="showSignInModal" />
  <HelpModal v-show="HelpModalVisible" @close="closeHelpModal"/>
  <OptionsModal v-show="OptionsModalVisible" @close="closeOptionsModal" @setWordLength="setWordLength"/>
</template>
<script>
import ToolTip from './ToolTip.vue';
import SignInModal from './SignInModal.vue';
import SignUpModal from './SignUpModal.vue';
import HelpModal from './HelpModal.vue';
import OptionsModal from './OptionsModal.vue';
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
    SignUpModal,
    HelpModal,
    OptionsModal
},
  data() {
    return {
      SignInModalVisible: false,
      SignUpModalVisible: false,
      HelpModalVisible: false,
      OptionsModalVisible: false
    }
  },
  emits: ["wordLength"],
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
    proTip(){
      this.$toast.info('ProTip! Make shorter words with higher value letters!')
    },
    setWordLength(value){
      this.$emit('wordLength', value)
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
    showHelpModal(){
      this.HelpModalVisible = true;
    },
    closeHelpModal(){
      this.HelpModalVisible = false;
    },
    showOptionsModal() {
      this.OptionsModalVisible = true;
    },
    closeOptionsModal(){
      this.OptionsModalVisible = false;
    }
  }

}

</script>
<style></style>