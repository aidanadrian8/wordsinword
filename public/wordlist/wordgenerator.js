import fullwordlist from './attempt2.json'
import goodwordlist from './valuedMasterWords.json'


// console.log(masterWord);

export function getMasterWord(wordLength) {
  if(wordLength == 'undefined' || wordLength == null || wordLength < 12){
    wordLength = randomIntFromInterval(12,18);
  }
  // let randomnumber = Math.floor(Math.random() * (goodwordlist.length)) + 0;
  // let masterWord = goodwordlist[randomnumber];
  let masterWord = "";
  //this is bad but a really easy way for me to just quickly grab a specific letter length
  while (masterWord.length < wordLength) {
    let randomnumber = Math.floor(Math.random() * (goodwordlist.length)) + 0;
    masterWord = goodwordlist[randomnumber].wordName;
  }
  return masterWord;
}

function max(a, b) {
  return a > b ? a : b;
}

export function getBestKnapSack(W, ObjList) {
  const n = ObjList.length;
  const K = new Array(n + 1);

  for (let i = 0; i < K.length; i++) {
    K[i] = new Array(W + 1).fill(0);
  }

  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      if (i === 0 || w === 0) {
        K[i][w] = 0;
      } else if (ObjList[i - 1].wordName.length <= w) {
        K[i][w] = max(
          ObjList[i - 1].wordValue + K[i - 1][w - ObjList[i - 1].wordName.length],
          K[i - 1][w]
        );
      } else {
        K[i][w] = K[i - 1][w];
      }
    }
  }
  let res = K[n][W]; //this is the maximum value
  let included = [];
  let w = W;
  for (let i = n; i > 0 && res > 0; i--) {
    if (res === K[i - 1][w]) {
      continue;
    } else {
      included.push(ObjList[i - 1]);
      res = res - ObjList[i - 1].wordValue;
      w = w - ObjList[i - 1].wordName.length;
    }
  }

  return included.reverse();
}

export function getBestSackValue(sack){
  let accumulator = 0;
  for(let word of sack){
    accumulator += word.wordValue;
  }
  return accumulator;
}

export function isValidWord(i) {
  if(i.length > 2){
  return -1 != fullwordlist.findIndex(x => x.wordName === i)
  }
  return false;
}

export function getWordValue(i) {
  let index = fullwordlist.findIndex(x => x.wordName === i);

  return fullwordlist[index].wordValue
}

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
    if (canFormWordUsingLettersFromFirstWord(masterWord, word.wordName) && word != masterWord) {
      wordsThatCanBeCreated.push({ wordName: word.wordName, wordValue: word.wordValue });
    }
  }
  return wordsThatCanBeCreated;
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
