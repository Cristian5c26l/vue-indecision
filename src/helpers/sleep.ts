export const sleep = (seconds: number = 1) => {
  return new Promise((resolve) => {
    // Cuerpo de la promesa
    setTimeout(() => {
      return resolve(true);
    }, seconds * 1000);
  });
};
