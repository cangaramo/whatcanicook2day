<template>
    <div>
        <h4 class="my-4">Instructions</h4>
        <div v-if="instructions">
            <div
                class="instructions"
                v-for="step in instructions.steps"
                :key="step.number"
            >
                <div class="step">
                    <div class="number">
                        <p class="mb-0">{{ step.number }}</p>
                    </div>
                    <div class="information">
                        <p class="mb-0">{{ step.step }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Check instructions in the original site</p>
            <a
                v-if="source"
                :href="recipe.sourceUrl"
                target="_blank"
                class="btn mt-1"
                >See instructions</a
            >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        instructions: Object,
        source: String
    }
}
</script>

<style lang="scss">
@import '@/sass/variables.scss';

.single-recipe .instructions {
    .step {
        border-left: 1px solid $pink;
        .number {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-left: -12.5px;
            background: $pink;
            color: white;
            text-align: center;
        }
        .information {
            position: relative;
            left: 35px;
            top: -25px;
        }
    }
    &:last-child {
        .step {
            border: none;
        }
    }
}
</style>
