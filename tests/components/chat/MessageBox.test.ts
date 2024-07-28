import MessageBox from '@/components/chat/MessageBox.vue';
import { mount } from '@vue/test-utils';

describe('<MessageBox />', () => {
  const wrapper = mount(MessageBox);
  test('should renders input, button and all content html correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button svg').exists()).toBe(true);

    // console.log(wrapper.find('button').attributes()); // muestra los atributos que tiene el pimer elemento html button
    // console.log(wrapper.find('button').attributes('class')); // muestra el contenido del atributo class que tiene el pimer elemento html button
  });

  test('should emits sendMessage event when button is clicked with message value', async () => {
    const message = 'Hola Mundo';

    await wrapper.find('input[type="text"]').setValue(message);

    await wrapper.find('button').trigger('click');

    // Evaluar que, despues de hacer click en el boton, se haya emitido el evento "sendMessage" dentro de la funcion sendMessage
    // console.log(wrapper.emitted()); // muestra que se emitió input, change, sendMessage y click... wrapper.emitted() muestra todos los eventos que se han emitido
    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message]); //

    expect((wrapper.vm as any).message).toBe(''); //vm = v-model
  });

  test('should emits sendMessage event when keypress.enter is triggered with message value', async () => {
    const message = 'Hola Mundo';

    const input = wrapper.find('input[type="text"]');

    await input.setValue(message);

    await input.trigger('keypress.enter');

    // Evaluar que, despues de que dentro del input se presione enter, se haya emitido el evento "sendMessage" dentro de la funcion sendMessage
    // console.log(wrapper.emitted()); // muestra que se emitió input, change, sendMessage y click... wrapper.emitted() muestra todos los eventos que se han emitido
    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message]); //
    expect((wrapper.vm as any).message).toBe('');
  });

  test('should not emits sendMessage event when keypress.enter is triggered with message value empty', async () => {
    const wrapper = mount(MessageBox);

    const input = wrapper.find('input[type="text"]');

    await input.trigger('keypress.enter');

    expect(wrapper.emitted('sendMessage')).toBeFalsy();
  });
});
