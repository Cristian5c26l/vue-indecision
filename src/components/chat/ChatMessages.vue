<template>
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4">
    <div class="flex flex-col space-y-2">
      <!-- Messages go here -->
      <!-- <ChatBubble :itsMine="true" :message="'Quieres tomar un café?'" />
      <ChatBubble
        :itsMine="false"
        :message="'no'"
        :image="'https://yesno.wtf/assets/no/22-8806dbccb1edf544723b7f095ff722e8.gif'"
      /> -->

      <!-- <ChatBubble
        v-for="message in messages"
        :key="message.id"
        :its-mine="message.itsMine"
        :message="message.message"
        :image="message.image"
      /> -->

      <!-- :is-last="index === messages.length - 1" -->
      <ChatBubble v-for="message in messages" :key="message.id" v-bind="message" />
      <LoaderDots v-if="isTyping" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatBubble from '@/components/chat/ChatBubble.vue';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import LoaderDots from './LoaderDots.vue';
import { ref, watch } from 'vue';

interface Props {
  messages: ChatMessage[];
  isTyping: boolean;
}

const props = defineProps<Props>();

const chatRef = ref<HTMLDivElement | null>(null);

watch(props, () => {
  // funcion watch estará observando "messages". Cuando detecte que cambia propiedad messages, se ejecutará la funcion de flecha que hace que se haga el scroll hasta abajo. Es necesario que se ejecute despues de 100 milisegundos para que los mensajes (ChatBubbles) se hayan renderizado por completo para despues hacer el scrollTo
  // console.log('messages cambió');
  setTimeout(() => {
    chatRef.value?.scrollTo({
      top: chatRef.value.scrollHeight, // posicion hacia donde se realizará el scroll
      behavior: 'smooth', // smooth hace que el scroll del elemento chatRef haga un scroll lento
    });
  }, 100);
});
</script>
