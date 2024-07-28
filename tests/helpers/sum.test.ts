import { describe, expect, test } from 'vitest';
import { sum, addArray } from '../../src/helpers/sum';

describe('sum function', () => {
  test('adds 1 + 2 to equal 3', () => {
    // 1. Preparacion de lo necesario para el sujeto de pruebas
    const a = 1;
    const b = 2;

    // 2. Estimular sujeto de pruebas. Como es una funcion, estimular sería mandarla a llamar o ejecutar
    const result = sum(a, b);

    // 3. Esperar comportamiento
    expect(result).toBe(a + b);
  });
});

describe('addArray function', () => {
  test('addArray function should return a number', () => {
    // Preparacion
    const numbers = [5, 6];

    // Estimulo
    const result = addArray(numbers);

    // Comportamiento esperado
    expect(typeof result).toBe('number');
  });

  test('addArray function should return 0 if array is empty', () => {
    const numbers: number[] = [];

    const result = addArray(numbers);

    expect(result).toBe(0);
  });

  test('addArray function should return the correct sum value', () => {
    // Preparacion
    const a = 1;
    const b = 2;
    const c = 3;
    const numbers = [a, b, c];

    // Estimulo
    const result = addArray(numbers);

    // Comportamiento esperado
    expect(result).toBe(a + b + c);
  });
});
