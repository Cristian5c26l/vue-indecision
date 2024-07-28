import ChatMessages from '@/components/chat/ChatMessages.vue';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import { mount } from '@vue/test-utils';

const messages: ChatMessage[] = [
  { id: 1, isLast: true, itsMine: true, message: 'Hola' },
  { id: 2, isLast: true, itsMine: false, message: 'Mundo', image: 'https://hola-mundo/image.jpg' },
];

const sleep = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, 150);
  });
};

describe('<ChatMessages />', () => {
  const isTyping = false;
  const wrapper = mount(ChatMessages, {
    props: {
      messages,
      isTyping,
    },
  }); // wrapper apunta al componente montado "ChatMessages"

  test('should renders chat messages correctly', () => {
    const chatBubbles = wrapper.findAllComponents({ name: 'ChatBubble' });
    expect(chatBubbles.length).toBe(messages.length);
  });

  test('should scrolls down to the bottom after messages update', async () => {
    const scrollToMock = vi.fn();

    // console.log(wrapper.vm.$refs); // muestra { chatRef: HTMLDivElement {} }

    const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;
    chatRef.scrollTo = scrollToMock;

    await wrapper.setProps({
      // Cambiar messages de props de wrapper (ChatMessages)
      messages: [...messages, { id: 3, isLast: true, itsMine: true, message: 'Hey!' }],
    });

    // await new Promise((r) => setTimeout(r, 150));
    await sleep(); // Establecer retardo para que despues de cambiar messages se alcance a re-renderizar ChatMessages y después de esto se ejecute el callback del watch(props) de ChatMessages.vue (watch(props, () => {...}) está destinado para detectar el cambio de alguna propiedad (como messages) de props de ChatMessages. Cuando detecte dicho cambio, va a disparar el callback () => {...}) donde dentro de callback se ejecuta scrollTo del chatRef

    expect(scrollToMock).toHaveBeenCalled();
    expect(scrollToMock).toHaveBeenCalledOnce();
    expect(scrollToMock).toHaveBeenCalledTimes(1);
    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: expect.any(Number),
    });
  });
});
