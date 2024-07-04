import { sleep } from '@/helpers/sleep';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import type { YesNoResponse } from '@/interfaces/yes-no.response';
import { ref } from 'vue';

export const useChat = () => {
  const messages = ref<ChatMessage[]>([]);
  const isTyping = ref(false);

  const getHerResponse = async () => {
    try {
      const resp = await fetch('https://yesno.wtf/api'); // puede arrojar una excepcion la promesa fetch en caso de que no se tenga acceso a internet

      if (!resp.ok) throw 'Error en la petición a la api de yesno.wtf'; // redirigir la ejecucion de modo que se ejecute a partir del catch e imprima este string (error)

      const data = (await resp.json()) as YesNoResponse;

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const onSendMessage = async (text: string) => {
    if (text.length === 0) return;

    const messagesMine = messages.value.filter((m) => m.itsMine === true);

    if (messagesMine.length === 0) {
      messages.value.push({
        id: new Date().getTime(),
        itsMine: true,
        message: text,
        isLast: true,
      });
    } else {
      const messagesNotMine = messages.value.filter((m) => m.itsMine === false);

      if (messagesNotMine.length == 0) {
        messagesMine[messagesMine.length - 1].isLast = false;
        messages.value.push({
          id: new Date().getTime(),
          itsMine: true,
          message: text,
          isLast: true,
        });
      } else {
        if (!messages.value[messages.value.length - 1].itsMine) {
          messages.value.push({
            id: new Date().getTime(),
            itsMine: true,
            message: text,
            isLast: true,
          });
        } else {
          messages.value[messages.value.length - 1].isLast = false;
          messages.value.push({
            id: new Date().getTime(),
            itsMine: true,
            message: text,
            isLast: true,
          });
        }
      }
    }

    if (!text.endsWith('?')) return;

    isTyping.value = true;

    await sleep(1.5); // esto es como hacer sleep(1.5).then(resp => ...), solo que, lo que se obtenga de la promesa, no nos interesa

    const data = await getHerResponse();

    isTyping.value = false;

    if (!data) return;

    messages.value.push({
      id: new Date().getTime(),
      itsMine: false,
      message: data.answer,
      image: data.image,
      isLast: true,
    });

    // const totalMessagesNotMine = messages.value.filter((m) => m.itsMine === false);

    // if (totalMessagesNotMine.length === 0) {
    //   messages.value.push({
    //     id: new Date().getTime(),
    //     itsMine: false,
    //     message: data.answer,
    //     image: data.image,
    //     isLast: true,
    //   });
    // } else {
    //   totalMessagesNotMine[totalMessagesNotMine.length - 1].isLast = false;

    //   messages.value.push({
    //     id: new Date().getTime(),
    //     itsMine: false,
    //     message: data.answer,
    //     image: data.image,
    //     isLast: true,
    //   });
    // }
  };

  return {
    // Properties
    messages,
    isTyping,

    // Methods
    onSendMessage,
  };
};
