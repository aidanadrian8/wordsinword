<template>
  <div class="myModal-backdrop">
    <div class="myModal bg-light">
      <header class="myModal-header">
        <h2 class="mb-0">Results</h2>
        <button type="button" class="btn-close mb-0" @click="close">
        </button>
      </header>

      <section class="myModal-body">
        <table class="table table-light">
          <thead>
            <tr>
              <td>Your Score</td>
              <td>Your Percentage:</td>
              <td>Best Sack Score:</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ userSackScore }}</td>
              <td>{{ roundPercentage(userPercentage) }} %</td>
              <td>{{ bestSackScore }}</td>
            </tr>
          </tbody>
        </table>

        <div class="accordion mb-2" id="yourSack">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button text-dark collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Your Sack:
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
              data-bs-parent="#yourSack">
              <div class="accordion-body">
                <div class="card text-start p-2"
                  style="width:100%; margin:auto; min-height: 40px; max-height: 120px; overflow:hidden">
                  <div class="row" style="overflow-y: scroll;">
                    <div class="col-6 mb-1 sackWord" v-for="word in this.userSack" :key="word">
                      {{ word }} - {{ this.getUserWordValue(word) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion" id="bestSack">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button text-dark collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" @click="openedBestSack">
                Best Sack:
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
              data-bs-parent="#bestSack">
              <div class="accordion-body">
                <div class="card text-start p-2"
                  style="width:100%; margin:auto; min-height: 40px; max-height: 120px; overflow:hidden">
                  <div class="row" style="overflow-y: scroll;">
                    <div class="col-6 mb-1 sackWord" v-for="word in this.bestSack" :key="word">
                      <div class="light-highlight" v-if="inSack(word.wordName)">
                        {{ word.wordName }} - {{ word.wordValue }}
                      </div>
                      <div class="" v-else>{{ word.wordName }} - {{ word.wordValue }}</div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button @click="copyText()" class="btn mt-3" v-clipboard="clipBoardString">
          Copy Results To Clipboard
        </button>

      </section>
      <footer class="myModal-footer">
        <div class="btn-group" role="group">
          <button type="button" class="btn" @click="close">
            Try Again?
          </button>
          <button type="button" class="btn" @click="closeAndSubmit">
            Submit Score
          </button>
        </div>

      </footer>
    </div>
  </div>
</template>
<script>
import "@/store/index";
export default {
  name: 'myModal',
  data() {
    return {
      allowRetry: true,
      clipBoardString: ``,
    }
  },
  props: {
    masterWord: String,
    bestSack: Array,
    bestSackScore: Number,
    userSack: Array,
    userSackScore: Number,
    userPercentage: Number,
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    getStoreUserID() {
      return this.$store.getters.getUserID
    }
  },
  methods: {
    copyText() {
      let emoji = this.getEmoji();
      this.clipBoardString = `${emoji} Master Word: ${this.masterWord}, Score: ${this.userSackScore} ${emoji}\n${emoji} Percent: ${this.roundPercentage(this.userPercentage)}%,Best Sack Score: ${this.bestSackScore} ${emoji} \n                 Try WordSack!`
      this.$toast.info("Copied Results to Clipboard!")
    },
    getEmoji() {
      let emoji = "";
      if (this.userPercentage > 80) {
        emoji = '\u{2B50}';
      }
      else if (this.userPercentage > 70) {
        emoji = '\u{1F44D}';
      }
      else if (this.userPercentage > 60) {
        emoji = '\u{1F44C}';
      }
      else {
        emoji = '\u{1F4A9}';
      }
      const codePoint = emoji.codePointAt(0);
      return String.fromCodePoint(codePoint);
    },
    openedBestSack() {
      this.allowRetry = false;
      this.$toast.clear();
      this.$toast.warning("No retries!")
    },
    getUserWordValue(word) {
      return getWordValue(word);
    },
    inSack(word) {
      return this.userSack.indexOf(word) != -1;
    },
    close() {
      if (this.allowRetry) {
        this.$emit('close');
      }
      else {
        this.showAlert();
      }

    },
    closeAndSubmit() {
      if (this.isLoggedIn) {
        let data = {
          id: this.getStoreUserID,
          currentScore: this.userPercentage
        }
        this.$store.dispatch('submitGame', data)
          .then(response => {
            console.log(response);
            this.$toast.info("Sack Submitted")
          })
          .catch(error => {
            console.log(error);
            this.$toast.warning("Sack Submission Failed, Log in?")
          })

        console.log(localStorage.auth_token)
        this.$store.dispatch('loginUserWithToken2', localStorage.auth_token)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
        this.$emit('submit');
      }
      else{
        this.$toast.info("Sack Submitted, Log In to Save!")
        this.$emit('submit');
      }

    },
    roundPercentage(number) {
      return Math.round(number * 100) / 100
    },
    showAlert() {
      this.$toast.clear();
      this.$toast.warning("You looked at the best sack!")
    }
  },
};
import { getWordValue } from '../../public/wordlist/wordgenerator';
import { mapGetters } from "vuex";


</script>
<style>
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
}

.myModal {
  border-radius: 22px;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 400px;
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