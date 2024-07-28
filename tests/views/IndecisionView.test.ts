import ChatMessages from '@/components/chat/ChatMessages.vue';
import MessageBox from '@/components/chat/MessageBox.vue';
import IndecisionView from '@/views/IndecisionView.vue';
import { mount } from '@vue/test-utils';

const chatMockMessages = {
  template: '<div data-test-id="mock-messages">Mock ChatMessages</div>',
};

// ESTE MOCKEO SI FUNCIONA. mockear el retorno de la funcion useChat contenida en el archivo useChat.ts. Un ejercicio similar esta en https://vitest.dev/api/vi.html#vi-dounmock
// vi.mock('@/composables/useChat', () => ({
//   useChat: () => ({
//     messages: [],
//     isTyping: false,
//     onSendMessage: vi.fn(),
//   }),
// }));

// ESTE MOCKEO FUNCIONA
// Para la prueba should calls onSendMessage when sending a message (version 2).
//ESTA ES UNA PREPARACION PARA QUE CUANDO SE IMPORTE FUNCION useChat que está en useChat.ts y despues se recuperé onSendMessage de dicha funcion, onSendMessage sea un mock function
// vi.mock('@/composables/useChat', async (importOriginal) => {
//   const mod = await importOriginal<typeof import('@/composables/useChat')>(); // mod literalmente contiene todo lo exportado por @/composables/useChat

//   return {
//     ...mod, // esparcir toda funcion, variable u objeto contenido en mod (@/composables/useChat.ts)
//     useChat: vi.fn(() => ({
//       // Funcion useChat, que está dentro de mod, lo redefinimos, de modo que sea una funcion que retorne tambien un objeto con la propiedad onSendMessage la cual sea una funcion mockeada (vi.fn()), pero mantenga las otras propiedades originales contenidas en el objeto devuelto por funcion useChat() la cual es exportada desde @/composables/useChat
//       ...mod.useChat(), // Mantener propiedades devueltas por funcion useChat que está dentro de mod
//       onSendMessage: vi.fn(), // Mockea solo onSendMessage
//     })),
//   };
// });

describe('<IndecisionView />', () => {
  test('should renders chat messages and messagebox correctly', () => {
    const wrapper = mount(IndecisionView);

    expect(wrapper.html()).toMatchSnapshot();

    expect(wrapper.findComponent(ChatMessages).exists()).toBe(true);
    expect(wrapper.findComponent(MessageBox).exists()).toBe(true);
  });

  test('should calls onSendMessage when sending a message', async () => {
    // const consoleLogSpy = vi.spyOn(console, 'log');

    const onSendMessageMock = vi.fn();
    const wrapper = mount(IndecisionView, {
      global: {
        stubs: {
          ChatMessages: chatMockMessages,
        },
        mocks: {
          // mockear la funcion onSendMessage que vive en el script setup de IndecisionView.vue y que se ejecuta cuando MessageBox emite el evento sendMessage mandandole un mensaje a dicha funcion onSendMessage
          onSendMessage: onSendMessageMock,
        },
      },
    });
    // console.log(wrapper.vm); // muestra { onSendMessage: [AsyncFunction: onSendMessage] } solo si desde IndecisionView.vue onSendMessage se expone con defineExpose y cuando no se tiene vi.mock('@/composables/useChat'
    // Cuando se tiene mocks onSendMessage: onSendMessageMock, este ultimo sobreescribe el onSendMessage de useChat original

    // (wrapper.vm as any).onSendMessage = onSendMessageMock; // esto no funciona

    // Simular evento personalizado
    const messageBoxComponent = wrapper.findComponent(MessageBox); // messageBoxComponent es una instancia de MessageBox
    const message = 'Hola Mundo';
    messageBoxComponent.vm.$emit('sendMessage', message); // Esto hace que, al emitir el evento sendMessage (send-message del lado de vue y html) desde MessageBox, se ejecute la funcion asociada a dicho evento. Esta funcion sería onSendMessage la cual va a recibir

    // await new Promise((r) => setTimeout(r, 150));

    expect(onSendMessageMock).toHaveBeenCalled();
    expect(onSendMessageMock).toHaveBeenCalledOnce();
    expect(onSendMessageMock).toHaveBeenCalledTimes(1);
    expect(onSendMessageMock).toHaveBeenCalledWith(message);
  });

  // test('should calls onSendMessage when sending a message (version 2)', async () => {
  //   vi.mock('@/composables/useChat', async (importOriginal) => {
  //     const mod = await importOriginal<typeof import('@/composables/useChat')>(); // mod literalmente contiene todo lo exportado por @/composables/useChat

  //     return {
  //       ...mod, // esparcir toda funcion, variable u objeto contenido en mod (@/composables/useChat.ts)
  //       useChat: vi.fn(() => ({
  //         // Funcion useChat, que está dentro de mod, lo redefinimos, de modo que sea una funcion que retorne tambien un objeto con la propiedad onSendMessage la cual sea una funcion mockeada (vi.fn()), pero mantenga las otras propiedades originales contenidas en el objeto devuelto por funcion useChat() la cual es exportada desde @/composables/useChat
  //         ...mod.useChat(), // Mantener propiedades devueltas por funcion useChat que está dentro de mod
  //         onSendMessage: vi.fn(), // Mockea solo onSendMessage
  //       })),
  //     };
  //   });

  //   const wrapper = mount(IndecisionView, {
  //     global: {
  //       stubs: {
  //         ChatMessages: chatMockMessages,
  //       },
  //     },
  //   });
  //   console.log(wrapper.vm); // muestra { onSendMessage: [AsyncFunction: onSendMessage] } solo si desde IndecisionView.vue onSendMessage se expone con defineExpose y cuando no se tiene vi.mock('@/composables/useChat'

  //   // (wrapper.vm as any).onSendMessage = onSendMessageMock; // esto no funciona

  //   // Simular evento personalizado
  //   const messageBoxComponent = wrapper.findComponent(MessageBox); // messageBoxComponent es una instancia de MessageBox
  //   const message = 'Hola Mundo';
  //   messageBoxComponent.vm.$emit('sendMessage', message); // Esto hace que, al emitir el evento sendMessage (send-message del lado de vue y html) desde MessageBox, se ejecute la funcion asociada a dicho evento. Esta funcion sería onSendMessage la cual va a recibir el contenido de message

  //   // await new Promise((r) => setTimeout(r, 150));

  //   expect((wrapper.vm as any).onSendMessage).toHaveBeenCalled();
  //   expect((wrapper.vm as any).onSendMessage).toHaveBeenCalledOnce();
  //   expect((wrapper.vm as any).onSendMessage).toHaveBeenCalledTimes(1);
  //   expect((wrapper.vm as any).onSendMessage).toHaveBeenCalledWith(message);
  // });
});
