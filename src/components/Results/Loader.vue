<template>
    <div class="load">
        <hr />
        <hr />
        <hr />
        <hr />
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '@/sass/variables.scss';

.load {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*change these sizes to fit into your project*/
    width: 70px;
    height: 70px;
}
.load hr {
    border: 0;
    margin: 0;
    width: 30%;
    height: 30%;
    position: absolute;
    border-radius: 50%;
    animation: spin 2s ease infinite;
}

.load :first-child {
    background: $pink;
    animation-delay: -1.5s;
}
.load :nth-child(2) {
    background: $purple;
    animation-delay: -1s;
}
.load :nth-child(3) {
    background: $pink;
    animation-delay: -0.5s;
}
.load :last-child {
    background: $purple;
}

@keyframes spin {
    0%,
    100% {
        transform: translate(0);
    }
    25% {
        transform: translate(160%);
    }
    50% {
        transform: translate(160%, 160%);
    }
    75% {
        transform: translate(0, 160%);
    }
}
</style>
