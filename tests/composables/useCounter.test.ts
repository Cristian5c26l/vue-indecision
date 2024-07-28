import { useCounter } from '@/composables/useCounter';

describe('useCounter', () => {
  test('should initializes counter with provided default value', () => {
    const { counter, squareCounter } = useCounter();

    expect(counter.value).toBe(5);
    expect(squareCounter.value).toBe(25);
  });

  test('should initializes counter with provided initial value', () => {
    const initialValue = 200;
    const { counter, squareCounter } = useCounter(initialValue);

    expect(counter.value).toBe(initialValue);
    expect(squareCounter.value).toBe(initialValue * initialValue);
  });

  test('should increments counter correctly', () => {
    // Preparacion. Tomar sujeto de pruebas counter
    const { counter, squareCounter } = useCounter();

    // Estimular sujeto de pruebas
    counter.value++;

    // Evaluar lo esperado
    expect(counter.value).toBe(6);
    expect(squareCounter.value).toBe(36);
  });
});
