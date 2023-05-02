import fullwordlist from './fullwordlist.json'
import goodwordlist from './goodwordlist.json'

// console.log(masterWord);

export function getMasterWord() {
  // let randomnumber = Math.floor(Math.random() * (goodwordlist.length)) + 0;
  // let masterWord = goodwordlist[randomnumber];
  let masterWord = "";
  //this is bad but a really easy way for me to just quickly grab a specific letter length
  while(masterWord.length < 12) {
    let randomnumber = Math.floor(Math.random() * (goodwordlist.length)) + 0;
    masterWord = goodwordlist[randomnumber];
  }
  return masterWord;
}

export function isValidWord(i) { return -1 != fullwordlist.indexOf(i) }

export function canFormWordUsingLettersFromFirstWord(word1, word2) {
  // Create an object to keep track of the count of each letter in word1
  const letterCount = {};
  for (const letter of word1) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }
  // Check if each letter in word2 is present in word1 and has a count greater than or equal to the count in word2
  for (const letter of word2) {
    if (!(letter in letterCount) || letterCount[letter] === 0) {
      return false;
    }
    letterCount[letter] -= 1;
  }

  return true;
}

export function getWordListFromMaster(masterWord) {
  let wordsThatCanBeCreated = [];
  for (let word of fullwordlist) {
    if (canFormWordUsingLettersFromFirstWord(masterWord, word) && word != masterWord) {
      wordsThatCanBeCreated.push(word);
    }
  }
  return wordsThatCanBeCreated;
}
