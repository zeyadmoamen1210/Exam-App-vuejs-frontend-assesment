<script setup>
</script>

<template>
    <div class="full-screen-loading">
        <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.full-screen-loading {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #FFF;
    display: grid;
    place-content: center;
    width: 100%;
    height: 100%;
    z-index: 2;
}
</style>