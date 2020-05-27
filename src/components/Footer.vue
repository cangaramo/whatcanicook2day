<template>
    <div class="footer" style="">
        <h6>What can I cook today?</h6>
        <p>by Clarisa Angaramo</p>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '@/sass/variables.scss';

.footer {
    padding: 40px 0;
    background: $purple;
    text-align: center;
    font-family: 'Poppins';
    h6 {
        color: white;
        font-weight: 700;
        margin-bottom: 3px;
    }
    p {
        color: white;
        margin-bottom: 0;
        font-size: 13px;
    }
}
</style>
