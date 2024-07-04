<template>
  <!-- Example Message -->
  <div v-if="itsMine" class="flex justify-end">
    <div class="bg-blue-200 text-black p-2 rounded-l-3xl rounded-t-3xl max-w-xs mr-2">
      {{ message }}
    </div>
    <div class="flex flex-col justify-end">
      <div>
        <!-- <img
          v-if="avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Richard_Husband%2C_NASA_photo_portrait_in_orange_suit.jpg/800px-Richard_Husband%2C_NASA_photo_portrait_in_orange_suit.jpg"
          alt="Profile Picture"
          class="w-6 h-6 object-cover rounded-full"
        /> -->

        <img
          v-if="isLast"
          src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
          alt="Profile Picture"
          class="w-6 h-6 object-cover rounded-full"
        />
      </div>
    </div>
  </div>

  <!-- Example Received Message -->
  <div v-else class="flex">
    <div class="flex flex-col justify-end mr-2">
      <div>
        <img
          v-if="isLast"
          src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
          alt="Profile Picture"
          class="w-6 h-6 object-cover rounded-full"
        />
      </div>
    </div>

    <div class="bg-gray-300 text-black p-2 rounded-r-3xl rounded-t-3xl max-w-xs">
      <span class="capitalize">{{ message }}</span>
      <img v-if="image" :src="image" alt="YesNoImage" class="w-52 h-52 object-cover rounded-md" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  // Propiedades que necesita recibir este componente
  message: string;
  itsMine: boolean; // Por ejemplo, desde ChatMessages puedo colocar un componente llamado ChatBubble con propiedad its-mine, es decir, <ChatBubble :its-mine />, donde its-mine se recuperará como itsMine
  image?: string;
  isLast: boolean;
}

defineProps<Props>(); // Con la ejecucion de esta funcion, las propiedades que recibe el componente ChatBubble se pasarán al template
</script>
