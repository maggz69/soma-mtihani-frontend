<template lang="">
    <div>
        <div class="grid grid-cols-3 gap-3 items-center">
            <div class="rounded bg-white text-center shadow px-5 py-3">
                <p class="text-gray-800">Questions Taken</p>
                <h3 class="text-2xl text-gray-900 font-semibold">{{questionsTaken}}</h3>
            </div>
            <div class="rounded bg-white text-center shadow px-5 py-3">
                <p class="text-gray-800">Questions Submitted</p>
            <h3 class="text-2xl text-gray-900 font-semibold">{{questionsTaken}}</h3>
            </div>
            <div class="rounded bg-white text-center shadow px-5 py-3">
                <p class="text-gray-800">My Points</p>
                <h3 class="text-2xl text-gray-900 font-semibold">{{questionsTaken}}</h3>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    setup(props) {
        const questionsTaken = props.questionsTaken
        const questionsSubmitted = props.questionsSubmitted
        const myPoints = props.myPoints
        return {
            questionsTaken,
            questionsSubmitted,
            myPoints
        }
    },
    props: {
        questionsTaken: {
            type: Number,
            default: 0
        },
        questionsSubmitted: {
            type: Number,
            default: 0
        },
        myPoints: {
            type: Number,
            default: 0
        }
    }

}
</script>
<style lang="">
    
</style>