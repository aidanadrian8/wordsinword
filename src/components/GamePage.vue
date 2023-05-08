<template>
  <div class="container">
    <div class="header mt-5">
      <h1 id="masterWordHeading" ref="masterWordHeading" v-html="masterHeading"></h1>
    </div>
    <div style="width:400px; margin:auto;">
      <div class="form-group">
        <input type="text" ref="wordInput" v-model="currentTyped" onkeydown="return /[a-z]/i.test(event.key)"
          @keyup.enter="onPressEnter" class="form-control" placeholder="Make a word from the word above!">
      </div>
    </div>
    <div class="container text-start mt-5" style="width:400px;">
      <small class="form-text text-muted">Your Sack Value: {{ sackValue }}</small>
    </div>
    <div class="card text-start p-2" style="width:400px; margin:auto; min-height: 40px;" >
      <div class="row">
      <div class="col-6 mb-1 sackWord" v-for="word in this.sackStorage" :key="word">
         {{ word }} - {{ getWordValue(word) }} <span @click="removeWordFromSack(word)" class="btn btn-light btn-sm float-end">X</span></div>
        </div>
    </div>
    <button class="btn mt-2 mb-5" style="width:400px">
      Submit Sack
    </button>
    <div class="container mt-5" style="width:400px">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" @click="newMasterWord">New Word</button>
        <button type="button" class="btn btn-secondary">Show Stats</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GamePage",
  data() {
    return {
      masterWord: null,
      masterHeading: null,
      currentTyped: null,
      sackStorage: [],
      sackDisplay: null,
      sackValue: 0
    }
  },
  watch: {
    currentTyped() {
      this.currentTyped = this.currentTyped.toLowerCase();
      this.letterReader(this.currentTyped);
    }
  },
  created() {
    if (this.masterWord == null) {
      this.masterWord = wordgenerator.getMasterWord();
    }
    let possibleWordList = wordgenerator.getWordListFromMaster(this.masterWord);
    console.log(possibleWordList)

    this.masterHeading = this.masterWord;
  },
  methods: {
    getWordValue(word) {

      return wordgenerator.getWordValue(word)
    },
    setSackValue() {
      let accumulator = 0;
      for(let word of this.sackStorage) {
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
      this.$refs.wordInput.classList.remove('shaker');
      console.log("enter pressed")
      let valid = this.checkWord(this.currentTyped);
      if (valid) {

        this.addWordToSack(this.currentTyped);
        this.setSackValue();
        this.currentTyped = ""
      }
      else {
        this.$refs.wordInput.classList.add('shaker');
        setTimeout(this.removeShaker, 100);
      }
    },
    removeShaker() {
      this.$refs.wordInput.classList.remove('shaker');
    },
    checkWord(typed_letters) {
      console.log("first test: " + wordgenerator.canFormWordUsingLettersFromFirstWord(this.masterWord, this.currentTyped))
      if (!wordgenerator.canFormWordUsingLettersFromFirstWord(this.masterWord, this.currentTyped)) {
        return false;
      }
      console.log("second test: " + wordgenerator.isValidWord(typed_letters))
      if (!wordgenerator.isValidWord(typed_letters)) {
        return false;
      }
      console.log("third test: " + String(this.sackStorage.indexOf(typed_letters) != -1))
      if (this.sackStorage.indexOf(typed_letters) != -1) {
        return false;
      }
      return true;
      // tersers are cool
      // return!!wordgenerator.canFormWordUsingLettersFromFirstWord(this.masterWord,this.currentTyped)&&!!wordgenerator.isValidWord(typed_letters)
    },
    addWordToSack(word) {
      if (this.sackStorage.indexOf(word) == -1) {
        this.sackStorage.push(word);
      }
    },
    newMasterWord() {
      this.masterWord = wordgenerator.getMasterWord();
      let possibleWordList = wordgenerator.getWordListFromMaster(this.masterWord);
      console.log(possibleWordList)
      this.masterHeading = this.masterWord;
      this.sackDisplay = "";
      this.sackStorage = [];
      this.sackValue = 0
    },
    removeWordFromSack(word) {
      console.log(word)
      let index = this.sackStorage.indexOf(word);
      this.sackStorage.splice(index,1);
      console.log(this.sackStorage);
      this.setSackValue();
    }
  }
}
import * as wordgenerator from '../../public/wordlist/wordgenerator';




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