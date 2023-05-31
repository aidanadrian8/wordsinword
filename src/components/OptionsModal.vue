<template>
    <div class="myModal-backdrop">
        <div class="myModal bg-light">
            <header class="myModal-header">
                <h2 class="mb-0">Options</h2>
                <button type="button" class="btn-close mb-0" @click="close">
                </button>
            </header>
            <section class="myModal-body">
                <div class="">
                    <label for="">Set Game Mode</label>
                    <label for="">(New Modes Coming Soon!)</label>
                    <select class="form-select" aria-label="Default select example">
                        <option value="1">Limited Sack</option>
                        <option value="2" disabled>Sack Unlimited</option>
                        <option value="3" disabled>Multiplayer</option>
                    </select>
                    <br>
                    <label for="wordLengthRange">Word Length: {{ wordLength }}</label>
                    <input type="range" class="form-range" min="10" max="20" step="1" id="wordLengthRange"
                        v-model="wordLength">
                </div>

            </section>
            <footer class="myModal-footer">
                <button @click="applyChanges" class="btn">
                    Apply Changes
                </button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name: "OptionsModal",
    data() {
        return {
            wordLength: 12
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        applyChanges(){
            this.$emit('setWordLength', this.wordLength)
            this.$toast.info("Changes applied!")
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