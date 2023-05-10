<template>
    <div class="myModal-backdrop">
        <div class="myModal">
            <header class="myModal-header">
                Results
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </header>

            <section class="myModal-body">
                Your Score: {{ userSackScore }}
                Your percentage: {{ userPercentage }}
                Best Sack Score: {{ bestSackScore }}
                Best Sack Contents:
                <div class="card text-start p-2"
                    style="width:400px; margin:auto; min-height: 40px; max-height: 120px; overflow:hidden">
                    <div class="row" style="overflow-y: scroll;">
                        <div class="col-6 mb-1 sackWord" v-for="word in this.bestSack" :key="word">
                            {{ word.wordName }} - {{ word.wordValue }}</div>
                    </div>
                </div>
            </section>

            <footer class="myModal-footer">
                You probably sucked
                <button type="button" class="btn-green" @click="close">
                    Close myModal
                </button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name: 'myModal',
    props: {
        masterWord: String,
        bestSack: Array,
        bestSackScore: Number,
        userSack: Array,
        userSackScore: Number,
        userPercentage: String,
    },
    methods: {
        close() {
            this.$emit('close');
        },
    },
};

</script>
<style>
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
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
}

.myModal-header,
.myModal-footer {
    padding: 15px;
    display: flex;
}

.myModal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
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

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
}

.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
}
</style>