<template>
  <div class="container">
    <div class="header mt-5">
      <h1 id="masterWordHeading" ref="masterWordHeading" v-html="masterHeading"></h1>
    </div>
    <div style="width:400px; margin:auto;">
      <div class="form-group">
        <input type="text" ref="wordInput" v-model="currentTyped" onkeydown="return /[a-z]/i.test(event.key)"
          @keyup.enter="onPressEnter" class="form-control" placeholder="Make a word from the word above!" autofocus>
      </div>
    </div>
    <div class="text-start ms-auto me-auto mt-5" style="width:400px;">
      <small class="form-text text-muted float-start">Your Sack Value: {{ sackValue }} </small>
      <small class="form-text text-muted float-end">
        Letters Left: {{ this.sackWeightLimit - (this.calculateSackWeight() + this.currentTyped.length) }}
      </small>
      <div class="progress mb-3" style="clear:both;">
        <div ref="progressBar" class="progress-bar" role="progressbar" v-bind:style="{ width: progressBarValue + '%' }"
          v-bind:aria-valuenow="progressBarValue" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

    </div>
    <div class="card text-start p-2" style="width:400px; margin:auto; min-height: 40px; max-height: 120px; overflow:hidden">
      <div class="row" style="overflow-y: scroll;">
        <div class="col-6 mb-1 sackWord" v-for="word in this.sackStorage" :key="word">
          {{ word }} - {{ getWordValue(word) }} <span @click="removeWordFromSack(word)"
            class="btn btn-light btn-sm float-end">X</span></div>
      </div>
    </div>
    <button class="btn mt-2 mb-5" style="width:400px" @click="submitSack">
      Submit Sack
    </button>
    <div class="container mt-5" style="width:400px">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" @click="newMasterWord">New Word</button>
        <button type="button" class="btn btn-secondary" @click="showModal">Show Stats</button>
      </div>
    </div>
  </div>
  <ResultsModal v-show="showResultsModal" @close="closeModal" :masterWord="this.masterWord" :userSack="this.sackStorage" :userSackScore="this.sackValue" :userPercentage="this.userPercentage" :bestSack="this.bestSack" :bestSackScore="this.bestSackScore" />
</template>
<script>
export default {
  name: "GamePage",
  components: {
    ResultsModal
  },
  data() {
    return {
      masterWord: null,
      masterHeading: null,
      currentTyped: null,
      sackStorage: [],
      sackDisplay: null,
      sackValue: 0,
      gameMode: 0, //0:Limited Sack 1: Unlimited Sack
      progressBarValue: 0,
      sackWeightLimit: 50,
      showResultsModal: false,
      bestSackScore: null,
      bestSack: [],
      possibleWordList: [],
      userPercentage: null,
    }
  },
  watch: {
    currentTyped() {
      this.currentTyped = this.currentTyped.toLowerCase();
      this.letterReader(this.currentTyped);
    }
    },
    created() {
      this.newMasterWord();
    },
  methods: {
    showModal(){
      this.showResultsModal = true;
    },
    closeModal(){
      this.showResultsModal = false;
    },
    getWordValue(word) {

      return wordgenerator.getWordValue(word)
    },
    setSackValue() {
      let accumulator = 0;
      for (let word of this.sackStorage) {
        accumulator += wordgenerator.getWordValue(word)
      }
      this.sackValue = accumulator;
    },
    letterReader(inputText) {
      let tempList = this.masterWord.split("");
      for (let letter of inputText) {
        let index = tempList.indexOf(letter);
        if (~index) {
          tempList.splice(index, 1);
        }
        this.headerBuilder(this.currentTyped.split(""));
      }
      if (!inputText) {
        this.masterHeading = this.masterWord
      }
    },
    headerBuilder(typed_letters) {
      let tempWord = this.masterWord.split("");
      let badLetters = [`<span class="badLighted"> + </span>`];
      for (let letter of typed_letters) {
        let index = tempWord.indexOf(letter);
        if (~index) {
          tempWord.splice(index, 1, `<span class="highlighted">${letter}</span>`)
        }
        else {
          badLetters.push(`<span class="badLighted">${letter}</span>`);
        }
      }
      let tempBadLetters = badLetters.length > 1 ? badLetters.join('') : "";
      tempWord = tempWord.join('') + tempBadLetters;
      this.masterHeading = tempWord;
    },
    onPressEnter() {
      this.removeShaker();
      let valid = this.checkWord(this.currentTyped);
      if (valid) {

        this.addWordToSack(this.currentTyped);
        this.setSackValue();
        this.currentTyped = ""
      }
      else {
        this.shakeInput();
      }
    },
    shakeInput() { //this needs to be used in conjunction with 
      this.$refs.wordInput.classList.add('shaker');
      setTimeout(this.removeShaker, 100);
    },
    removeShaker() {
      this.$refs.wordInput.classList.remove('shaker');
    },
    checkWord(typed_letters) {
      // console.log("word can be made from word: " + wordgenerator.canFormWordUsingLettersFromFirstWord(this.masterWord, this.currentTyped))
      if (!wordgenerator.canFormWordUsingLettersFromFirstWord(this.masterWord, this.currentTyped)) {
        return false;
      }
      // console.log("word is word: " + wordgenerator.isValidWord(typed_letters))
      if (!wordgenerator.isValidWord(typed_letters)) {
        return false;
      }
      // console.log("word is already in sack test: " + String(this.sackStorage.indexOf(typed_letters) != -1))
      if (this.sackStorage.indexOf(typed_letters) != -1) {
        return false;
      }
      // console.log("word overfills sack fourth test: " + String(this.calculateSackWeight() + typed_letters.length / this.sackWeightLimit > 1));//shit I need to check if it will be over
      // console.log("sackweight + typed_letters.length: " + Number(this.calculateSackWeight() + typed_letters.length))
      if ((Number(this.calculateSackWeight()) + Number(typed_letters.length)) / this.sackWeightLimit > 1) {
        return false;
      }
      if(typed_letters == this.masterWord){
        return false;
      }
      return true;
      // tersers are cool
      // return!!wordgenerator.canFormWordUsingLettersFromFirstWord(this.masterWord,this.currentTyped)&&!!wordgenerator.isValidWord(typed_letters)
    },
    addWordToSack(word) {
      this.sackStorage.push(word);
      this.progressBarValue = (this.calculateSackWeight() / this.sackWeightLimit) * 100;
      if(this.progressBarValue > 75){
        this.$refs.progressBar.classList.add('bg-success')
      }
      
    },
    calculateSackWeight() {
      let accumulator = 0;
      for (let word of this.sackStorage) {
        accumulator += word.length;
      }
      return accumulator;
    },
    newMasterWord() {
      this.masterWord = wordgenerator.getMasterWord();
      // let possibleWordList = wordgenerator.getWordListFromMaster(this.masterWord);
      // console.log(wordgenerator.getBestKnapSack(this.sackWeightLimit, possibleWordList));
      this.masterHeading = this.masterWord;
      this.sackDisplay = "";
      this.sackStorage = [];
      this.sackValue = 0
      this.currentTyped = ""
      this.progressBarValue = 0
      if(this.$refs.progressBar){
        this.$refs.progressBar.classList.remove('bg-success')
      }
      this.possibleWordList = wordgenerator.getWordListFromMaster(this.masterWord)
      this.bestSack = wordgenerator.getBestKnapSack(this.sackWeightLimit, this.possibleWordList)
      this.bestSackScore = wordgenerator.getBestSackValue(this.bestSack)


    },
    removeWordFromSack(word) {
      let index = this.sackStorage.indexOf(word);
      this.sackStorage.splice(index, 1);
      this.setSackValue();
      this.progressBarValue = (this.calculateSackWeight() / this.sackWeightLimit) * 100;
      if(this.progressBarValue < 75){
        this.$refs.progressBar.classList.remove('bg-success')
      }
    },
    submitSack() {
      if(this.progressBarValue > 75){
      // console.log("Your Sack Value: " + this.sackValue + " Your grade: " + ((this.sackValue / wordgenerator.getBestSackValue(wordgenerator.getBestKnapSack(this.sackWeightLimit, wordgenerator.getWordListFromMaster(this.masterWord)))) * 100) + "%" ) + " Best Possible Score: " + wordgenerator.getBestSackValue(wordgenerator.getBestKnapSack(this.sackWeightLimit, wordgenerator.getWordListFromMaster(this.masterWord)));
      this.userPercentage = ((this.sackValue / wordgenerator.getBestSackValue(wordgenerator.getBestKnapSack(this.sackWeightLimit, wordgenerator.getWordListFromMaster(this.masterWord)))) * 100) + "%";
      this.showModal()
      // console.log(wordgenerator.getBestKnapSack(this.sackWeightLimit, wordgenerator.getWordListFromMaster(this.masterWord)))
    }
      
      
    }
  }
}
import * as wordgenerator from '../../public/wordlist/wordgenerator';
import ResultsModal from './ResultsModal.vue';


</script>
<style>
html {
  font-size: 16px;
}

.header {
  width: 100%;
  font-size: 20px;
  overflow-wrap: break-word;
  hyphens: auto;
}

@media (max-width: 700px) {
  .header {
    font-size: 14px;
  }
}

.shaker {
  animation: shake 0.2s;
}

h1 {
  font-size: 3.5em;
  color: #079cff;
  font-family: "Arial Black", Gadget, sans-serif;
  text-shadow: 0px 0px 0 rgb(2, 151, 250),
    0px 1px 0 rgb(-3, 146, 245),
    0px 2px 0 rgb(-7, 142, 241),
    0px 3px 0 rgb(-12, 137, 236),
    0px 4px 0 rgb(-17, 132, 231),
    0px 5px 0 rgb(-22, 127, 226),
    0px 6px 0 rgb(-27, 122, 221),
    0px 7px 0 rgb(-31, 118, 217),
    0px 8px 0 rgb(-36, 113, 212),
    0px 9px 0 rgb(-41, 108, 207),
    0px 10px 0 rgb(-46, 103, 202),
    0px 11px 10px rgba(0, 0, 0, 0.6),
    0px 11px 1px rgba(0, 0, 0, 0.5),
    0px 0px 10px rgba(0, 0, 0, .2);
  margin-bottom: 2.3rem;
}

.badLighted {
  color: #eeff07;
  font-family: "Arial Black", Gadget, sans-serif;
  text-shadow: 0px 0px 0 rgb(233, 250, 2),
    0px 1px 0 rgb(228, 245, 0),
    0px 2px 0 rgb(224, 241, 0),
    0px 3px 0 rgb(219, 236, 0),
    0px 4px 0 rgb(214, 231, 0),
    0px 5px 0 rgb(209, 226, 0),
    0px 6px 0 rgb(204, 221, 0),
    0px 7px 0 rgb(200, 217, 0),
    0px 8px 0 rgb(195, 212, 0),
    0px 9px 0 rgb(190, 207, 0),
    0px 10px 0 rgb(185, 202, 0),
    0px 11px 10px rgba(0, 0, 0, 0.6),
    0px 11px 1px rgba(0, 0, 0, 0.5),
    0px 0px 10px rgba(0, 0, 0, .2);
}


.highlighted {
  color: #18ff07;
  font-family: "Arial Black", Gadget, sans-serif;
  text-shadow: 0px 0px 0 rgb(19, 250, 2),
    0px 1px 0 rgb(14, 245, 0),
    0px 2px 0 rgb(10, 241, 0),
    0px 3px 0 rgb(5, 236, 0),
    0px 4px 0 rgb(0, 231, 0),
    0px 5px 0 rgb(-5, 226, 0),
    0px 6px 0 rgb(-10, 221, 0),
    0px 7px 0 rgb(-14, 217, 0),
    0px 8px 0 rgb(-19, 212, 0),
    0px 9px 0 rgb(-24, 207, 0),
    0px 10px 0 rgb(-29, 202, 0),
    0px 11px 10px rgba(0, 0, 0, 0.6),
    0px 11px 1px rgba(0, 0, 0, 0.5),
    0px 0px 10px rgba(0, 0, 0, .2);
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }

  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }

  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }

  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }

  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }

  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }

  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }

  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }

  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }

  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }

  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>