<template>
    <div class="numbers">
        <div class="number">
            <p>
                {{ recipe.readyInMinutes
                }}<i class="ml-1 mb-1 fas fa-clock"></i>
            </p>
            <p>minutes</p>
        </div>
        <div class="number">
            <p>{{ recipe.servings }}<i class="ml-1 fas fa-user"></i></p>
            <p>servings</p>
        </div>
        <div class="number">
            <p>{{ recipe.healthScore }}<i class="ml-1 fas fa-plus"></i></p>
            <p>health score</p>
        </div>
        <div class="number">
            <p>{{ recipe.aggregateLikes }}<i class="ml-1 fas fa-heart"></i></p>
            <p>likes</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        recipe: {}
    }
}
</script>

<style lang="scss">
@import '@/sass/variables.scss';

.single-recipe .numbers {
    display: flex;
    margin: 25px 0 25px 0;
    .number {
        //border-right: 1px solid #dedede;
        margin: 0 7px;
        text-align: center;
        background: #f3f3f3;
        border-radius: 15px;
        width: 90px;
        height: 75px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p:first-child {
            font-weight: 600;
            font-family: 'Poppins';
            color: $pink;
            margin-bottom: 0;
            font-size: 22px;
            i {
                font-size: 18px;
                position: relative;
                top: -2px;
            }
        }
        p:last-child {
            color: #a0a0a0;
            margin-bottom: 0;
            font-size: 12px;
            font-weight: 500;
            margin-top: -2px;
        }
        &:first-child {
            margin-left: 0;
        }
        &:last-child {
            border: none;
        }
    }
}
</style>
