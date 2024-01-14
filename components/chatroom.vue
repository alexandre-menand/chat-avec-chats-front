<script setup lang="ts">
import { useVibrate } from '@vueuse/core'
import type { Cat } from "~/types/cat";
import { useWebSocket } from "@vueuse/core";
import { useWindowScroll } from "@vueuse/core";

const { x, y } = useWindowScroll();

const { vibrate, stop, isSupported } = useVibrate({ pattern: [100] })



const props = defineProps<{
  cat: Cat;
}>();

const { status, data, send, open, close } = useWebSocket(
  `ws://chats-backoffice.onrender.com/ws/${props.cat.id}`
);

const messages: any = ref([]);
watch(data, () => {
  const dataMessage = JSON.parse(data.value);
  if (!dataMessage.status) {
    dataMessage.messagestatus = deconectResponse[getRandomInt(6)];
  }
  messages.value.push(dataMessage);
  y.value = 10000000000000000;
  vibrate()
});

const text = ref("");
const submit = () => {
  send(text.value, true);
  text.value = "";
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const deconectResponse = [
  "est partie sur sur son arbre à chat",
  "est partie manger ses croquettes",
  "est partie faire ses griffes sur le canapé",
  "est partie chasser Mickey Mouse",
  "est partie joué à explodin Kitten",
  "est partie au bar à chat",
];
</script>

<template>
  <div>
    <img src="/img/bg-mobile.jpg" class="object-cover h-full w-full fixed top-0 left-0 right-0 bottom-0 -z-50 md:hidden"/>
    <img src="/img/bg-pc.jpg" class="object-cover h-full  w-full fixed top-0 left-0 right-0 bottom-0 -z-50 hidden md:block"/>
    <main class="my-40 z-40 ">
      <div
        v-for="message in messages"
        class="flex flex-col my-4"
        :class="{
          'items-end': message.cat.id === props.cat.id,
          'items-start': message.cat.id !== props.cat.id,
        }"
      >
        <div v-if="!message.status" class="text-gray-400 italic p-4">
          {{ message.cat.name }} {{ message.messagestatus }}
        </div>
        <div
          v-else
          class="flex items-end"
          :class="{
            'flex-row-reverse': message.cat.id === props.cat.id,
            'flex-row': message.cat.id !== props.cat.id,
          }"
        >
          <div class="bg-gray-100 w-12 h-12 rounded-full mx-2 overflow-hidden">
            <img
              :src="`/img/profil/${message.cat.img}`"
              alt=""
              class="object-cover"
            />
          </div>
          <div>
            <div v-if="message.cat.id !== props.cat.id">
              <p class="text-xs text-gray-400">{{ message.cat.name }}</p>
            </div>
            <div
              class="p-4 rounded-full"
              :class="{
                'rounded-br-none bg-pink-700 text-white': message.cat.id === props.cat.id,
                'rounded-tl-none bg-pink-100': message.cat.id !== props.cat.id,
              }"
            >
              {{ message.message }}
            </div>
          </div>
        </div>
      </div>
    </main>
   
    <form
      @submit.prevent="submit()"
      class="flex fixed bottom-0 left-0 right-0 p-4 backdrop-blur-md z-50"
    >
      <input
        type="text"
        v-model="text"
        class="focus:outline-pink-300 active:outline-pink-300 w-full border-gray-200 border p-2 px-4 rounded-l-full"
      />
      <button type="submit" class="p-2 px-4 bg-pink-200 rounded-r-full">
        <Icon name="ri:send-plane-fill" class="text-xl text-pink-600"/>
      </button>
    </form>
  </div>
</template>
