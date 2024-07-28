import { useChat } from '@/composables/useChat';

describe('useChat', () => {
  test('should add message when onSendMessage is called', async () => {
    const text = 'Hola Mundo';
    // Preparacion del sujeto de pruebas
    const { messages, onSendMessage } = useChat();

    // Estimulo
    await onSendMessage(text);

    // Evaluaciones
    expect(messages.value.length).toBe(1);
    expect(messages.value[0].itsMine).toBe(true);
    expect(messages.value[0].message).toBe(text);
    expect(messages.value[0]).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
      isLast: true,
    });
  });

  test('should add nothing if text is empty', async () => {
    const text = '';
    const { messages, onSendMessage } = useChat();

    await onSendMessage(text);

    expect(messages.value.length).toBe(0);
  });

  test('should gets her response correctly when message sent ends with "?"', async () => {
    const text = '¿Quieres café?';

    const { messages, onSendMessage } = useChat();

    await onSendMessage(text);

    await new Promise((r) => setTimeout(r, 2000)); // retardo de 2 segundos o 2000 milisegundos para dar chance a que se ejecute getHerResponse pues previamente está un retardo de 1.5 segundos (await sleep(1.5))

    const [myMessage, herMessage] = messages.value;

    expect(messages.value.length).toBe(2);
    expect(myMessage).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
      isLast: true,
    });
    expect(herMessage).toEqual({
      id: expect.any(Number),
      itsMine: false,
      message: expect.any(String),
      isLast: true,
      image: expect.any(String),
    });
  });

  test('mock response - fetch api', async () => {
    const mockResponse = { answer: 'yes', image: 'https://example.gif' };

    //ESTA ES UNA PREPARACION PARA QUE CUANDO SE EJECUTE FUNCION fetch internamente en funcion onSendMessage, dicha funcion fetch ya sea una funcion asincrona que retorne el objeto {ok: true, json: async () => mockResponse}
    (window as any).fetch = vi.fn(async () => ({
      json: async () => mockResponse,
      ok: true,
    })); // se trata window as any para asi evitar que typescript me obligue a implementar otros metodos y propiedades que sean relacionadas al fetch

    const text = '¿Quieres café?';

    const { messages, onSendMessage } = useChat();

    await onSendMessage(text); // internamente ejecutará getHerResponse la cual internamente ejecutará fetch, que ya va a estar mockeado

    await new Promise((r) => setTimeout(r, 1600));

    const [myMessage, herMessage] = messages.value;

    expect(messages.value.length).toBe(2);
    expect(myMessage).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
      isLast: true,
    });
    expect(herMessage).toEqual({
      id: expect.any(Number),
      itsMine: false,
      message: mockResponse.answer,
      isLast: true,
      image: mockResponse.image,
    });
  });
});
