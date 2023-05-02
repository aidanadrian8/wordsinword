<template>
    <div class="col-6"> {{ this.word }} <span onclick="removeWordFromSack()" class="btn btn-light btn-sm float-end">X</span> </div>
</template>
<script>
export default {
    props: {
        word: String,
    },
    methods: {
        removeWordFromSack() {
            console.log("deez nuts");
        }
    }
    
}
</script>
<style lang="">
    
</style>