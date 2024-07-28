export function sum(a: number, b: number) {
  return a + b;
}

// Cuando funcion addArray recibe arr = [1,2], devolverá la suma total de los numeros del array. En este caso, la funcion devolverá 3
export const addArray = (arr: number[]): number => {
  return arr.reduce((accumulateValue, currentValue) => accumulateValue + currentValue, 0); // accumulateValue comienza siendo el segundo argumento de la funcion reduce
};
