<!-- Fuente: https://tailwindcomponents.com/component/chat-layout -->
<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex items-center gap-4">
      <img
        class="w-12 h-12 object-cover rounded-full"
        src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ%3D"
        alt=""
      />
      <div class="dark:text-white">
        <span>Mi esposa</span
        ><!-- span or div does work! -->
        <div class="text-sm text-gray-500 dark:text-gray-300">En línea</div>
      </div>
    </div>

    <!--ChatMessages-->
    <ChatMessages :messages="messages" :is-typing="isTyping" />

    <!--MessageBox-->
    <MessageBox v-on:send-message="onSendMessage" />
  </div>
</template>

<script lang="ts" setup>
import ChatMessages from '@/components/chat/ChatMessages.vue';
import MessageBox from '@/components/chat/MessageBox.vue';
import { useChat } from '@/composables/useChat';

const { messages, onSendMessage, isTyping } = useChat();

// Exportar los métodos explícitamente para poder acceder a ellos en las pruebas
defineExpose({
  onSendMessage,
});
</script>
