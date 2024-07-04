<script setup lang="ts">
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
</script>


<template>
    <div>
        <h1>{{ route.params.slug }}</h1>
    </div>
</template>