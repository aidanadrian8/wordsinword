<template>
    <div class="myModal-backdrop">
        <div class="myModal bg-light">
            <header class="myModal-header">
                <h2 class="mb-0">User Results</h2>
                <button type="button" class="btn-close mb-0" @click="close">
                </button>
            </header>
            <section class="myModal-body">
                <div v-if="isLoggedIn">
                    <p>Email: {{ this.getUserEmail }}</p>
                    <table class="table">
                        <thead>
                            <tr>
                                <td>
                                    Average Score
                                </td>
                                <td>
                                    Best Score
                                </td>
                                <td>
                                    Games Played
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {{ this.getAverageScore }}%
                                </td>
                                <td>
                                    {{ this.getBestScore }}%
                                </td>
                                <td>
                                    {{ this.getGamesPlayed }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p class="m-auto mb-3">Please log in to view user stats!</p>
                </div>
            </section>
            <footer class="myModal-footer" v-show="isLoggedIn">
                <button @click="copyText()" class="btn" v-clipboard="clipBoardString">
                    Copy Stats To Clipboard
                </button>
            </footer>
        </div>
    </div>
</template>
<script>
import "@/store/index.js";
import { mapGetters } from "vuex";
export default {
    name: 'UserStatsModal',
    data() {
        return {
            clipBoardString: ""
        }
    },
    computed: {
        ...mapGetters(['getUserEmail', 'getBestScore', 'getAverageScore', 'getGamesPlayed', 'isLoggedIn'])
    },
    methods: {
        close() {
            this.$emit('close')
        },
        copyText() {
            this.clipBoardString = `${this.getEmoji(this.getAverageScore)} Average Score: ${this.getAverageScore}, Best Score: ${this.getBestScore} ${this.getEmoji(this.getBestScore)}, Games Played: ${this.getGamesPlayed} ${this.getEmoji(this.getAverageScore)}`
            this.$toast.info("Stats copied to clipboard!")
        },
        getEmoji(score) {
            let emoji = ""
            if (score > 80) {
                emoji = '\u{2B50}';
            }
            else if (score > 60) {
                emoji = '\u{1F44D}';
            }
            else if (score > 40) {
                emoji = '\u{1F44C}';
            }
            else {
                emoji = '\u{1F4A9}';
            }
            const codePoint = emoji.codePointAt(0)
            console.log(emoji)
            console.log('codePoint:', codePoint);
            return String.fromCodePoint(codePoint);
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
    padding: 20px 10px 5px;
}

.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
}
</style>