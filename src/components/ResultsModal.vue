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


                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button text-dark" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Best Sack Contents:
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="card text-start p-2"
                                    style="width:400px; margin:auto; min-height: 40px; max-height: 120px; overflow:hidden">
                                    <div class="row" style="overflow-y: scroll;">
                                        <div class="col-6 mb-1 sackWord" v-for="word in this.bestSack" :key="word">
                                            {{ word.wordName }} - {{ word.wordValue }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="myModal-footer">
                You probably sucked
                <button type="button" class="btn" @click="close">
                    Try Again?
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
        userPercentage: Number,
    },
    methods: {
        close() {
            this.$emit('close');
        },
        roundPercentage(number) {
            return Math.round(number * 100) / 100
        }
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
    border-radius: 22px;
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