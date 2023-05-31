<template>
  <div class="myModal-backdrop">
    <div class="myModal bg-light">
      <header class="myModal-header">
        <h2 class="mb-0">Help</h2>
        <button type="button" class="btn-close mb-0" @click="close">
        </button>
      </header>
      <section class="myModal-body">
        <div class="section-1 text-start">
          <h3 class="mt-0">I. Playing the Game</h3>
          <h5 class="m-1">I.I To Start</h5>
          <p class="m-2">Select the input above the progress bar and begin making words based on letters from the master
            word above.</p>
          <div class="accordion mb-2" id="pictureExample1">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                  aria-expanded="false" aria-controls="collapseOne">
                  Example:
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                data-bs-parent="#pictureExample1">
                <div class="accordion-body">
                  <img src="@/assets/helpPic1.png" alt="Example picture showing where to select" srcset=""
                    style="width: 100%;">
                </div>
              </div>
            </div>
          </div>
          <h5 class="mt-4 ms-1">I.II Filling your sack</h5>
          <p class="m-2">As you begin to fill your sack with words you may notice the "Letters left:" indicator to the right of
            the progress bar. This is where the real game begins. You only have a limited amount of words you
            can put in your sack based on the length of the master word (50 by default). So choose words wisely!
          </p>
          <h5 class="mt-4 ms-1">I.III Choosing your words</h5>
          <p class="m-2">Every letter in every word has a value (see the information tooltip in game for a quick reference),
            to increase your score make sure to make words with high value letters. Remove low value words to make space for higher value words! <span style="text-shadow: 1px 0 10px;">Tip: Make as many shorter words with higher value letters that you can.</span></p>
          <div class="accordion" id="LetterValueTable">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                  aria-expanded="false" aria-controls="collapseTwo">
                  Letter Values:
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                data-bs-parent="#LetterValueTable">
                <div class="accordion-body">
                  <table class="table table-center ms-1">
                    <thead>
                      <tr>
                        <td>
                          Value
                        </td>
                        <td>
                          Letters
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          1
                        </td>
                        <td>
                          A, E, I, O, U, L, N, S, T, R
                        </td>
                      </tr>
                      <tr>
                        <td>
                          2
                        </td>
                        <td>
                          D, G
                        </td>
                      </tr>
                      <tr>
                        <td>
                          3
                        </td>
                        <td>
                          B, C, M, P
                        </td>
                      </tr>
                      <tr>
                        <td>
                          4
                        </td>
                        <td>
                          F, H, V, W, Y
                        </td>
                      </tr>
                      <tr>
                        <td>
                          5
                        </td>
                        <td>
                          K
                        </td>
                      </tr>
                      <tr>
                        <td>
                          8
                        </td>
                        <td>
                          J, X
                        </td>
                      </tr>
                      <tr>
                        <td>
                          10
                        </td>
                        <td>
                          Q, Z
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <h5 class="mt-4 ms-1">I.III Submitting your sack</h5>
          <p class="m-2">You are allowed to submit your sack at 75% full, but this is unlikely to leave you with a good score. When you are ready and the progress bar has turned green, submit your sack to see how close you were from the best possible combination of words that you could make. Legal words are from the scrabble dictionary. If you wish to view the best possible sack it's important to note you won't be able to go back to your previous game! If you wish to save your average and best scores, be sure to create an account and log in when you play! Or feel free to share your results with a friend through the copy to clipboard link!</p>
        </div>
        <div class="section-2 text-start mt-4">
          <h3>II. Login/Sign Up</h3>
          <h5 class="mt-4 ms-1">II.I Signing Up</h5>
          <p class="m-2">Signing up is a breeze. Simply select the "WordSack" button, select the "Sign Up" option from the dropdown, and enter your email and password. After a successful signup you will be logged in and ready to start raising your average!</p>
          <h5 class="mt-4 ms-1">II.II Logging in</h5>
          <p class="m-2">If you can sign up, you can log in! Simply select the "WordSack" button, select the "Log In" option from the dropdown, and enter your email and password. And Happy Gaming!</p>
        </div>

      </section>
      <footer class="myModal-footer">
        <button type="button" class="btn-close mb-0" @click="close">
        </button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "HelpModal",
  methods: {
    close() {
      this.$emit('close');
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
  width: 420px;
  max-height: 60%;
  overflow: scroll;
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
  padding: 20px 20px;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}
</style>