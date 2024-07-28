import ChatBubble from '@/components/chat/ChatBubble.vue';
import { mount } from '@vue/test-utils';

describe('<ChatBubble />', () => {
  test('should renders own message correctly', () => {
    const message = 'Hola, lol';
    const itsMine = true;
    const isLast = true;

    const wrapper = mount(ChatBubble, {
      props: {
        message,
        itsMine,
        isLast,
      },
    });

    const messageMineContainer = wrapper.find('.rounded-l-3xl');
    const messageReceivedContainer = wrapper.find('.rounded-r-3xl');

    expect(messageMineContainer.exists()).toBeTruthy(); // toBeTruthy() = toBe(true)
    expect(messageMineContainer.text()).toContain(message);

    expect(messageReceivedContainer.exists()).not.toBe(true);
    expect(messageReceivedContainer.exists()).toBe(false);
    expect(messageReceivedContainer.exists()).toBeFalsy();
  });

  test('should renders received message correctly', () => {
    const message = 'Si';
    const itsMine = false;
    const isLast = true;

    const wrapper = mount(ChatBubble, {
      props: {
        message,
        itsMine,
        isLast,
      },
    });

    const messageReceivedContainer = wrapper.find('.rounded-r-3xl');
    const [, receivedImage] = wrapper.findAll('img');
    const messageMineContainer = wrapper.find('.rounded-l-3xl');

    expect(messageReceivedContainer.exists()).toBeTruthy();
    expect(messageReceivedContainer.text()).toContain(message);

    expect(messageMineContainer.exists()).toBeFalsy();
    expect(receivedImage).toBeUndefined();
  });

  test('should renders received message correctly with image', () => {
    const message = 'Si';
    const itsMine = false;
    const isLast = true;
    const image = 'https://example.com/img.jpg';

    const wrapper = mount(ChatBubble, {
      props: {
        message,
        itsMine,
        isLast,
        image,
      },
    });

    const messageReceivedContainer = wrapper.find('.rounded-r-3xl');
    const [, receivedImage] = wrapper.findAll('img');
    const messageMineContainer = wrapper.find('.rounded-l-3xl');

    expect(messageReceivedContainer.exists()).toBeTruthy();
    expect(messageReceivedContainer.text()).toContain(message);

    expect(messageMineContainer.exists()).toBeFalsy();
    expect(receivedImage.exists()).toBe(true);
    expect(receivedImage.attributes('src')).toBe(image);
  });
});
