<script setup lang="ts">
const cat = ref(null)
</script>

<template>
    <div>
        <header class="flex justify-center items-center fixed backdrop-blur-md p-2 top-0 left-0 right-0 z-50">
            <img src="/img/logo1.png" alt="" class="w-16 h-auto" />
            <p class="text-pink-500 font-bold">
                Chat avec des chats
            </p>
        </header>
        <Intro v-if="cat === null" @enter-chatroom="(i) => cat = i"></Intro>
        <Chatroom v-else :cat="cat"/>
    </div>
</template>