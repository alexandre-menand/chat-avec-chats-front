<script setup lang="ts">
import type { Cat } from "~/types/cat";

const api = useApiUrl();
const { data } = useFetch<Cat>(`${api}/cat`);

const emit = defineEmits<{
  (e: "enter-chatroom", cat: Cat): void;
}>();
</script>
<template>
  <div class="m-4 flex justify-center items-center flex-col  h-screen space-y-4" v-if="data">
    <div class="h-40 w-40 lg:h-80 lg:w-80 overflow-hidden rounded-full bg-gray-100">
      <img :src="`/img/profil/${data.img}`" class="object-cover object-center w-full h-full"/>
    </div>
   
    <p class="text-2xl">
      Tu es {{ data.name }}
    </p>
   
    <div>
      <button class="bg-pink-200 text-pink-700 p-4 rounded-full" @click="emit('enter-chatroom', data)" >Entrez dans le Chat des chats</button>
    </div>
  </div>
</template>
