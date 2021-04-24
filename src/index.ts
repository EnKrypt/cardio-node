import { performance } from 'perf_hooks';

export const cardioWrapper = (
  cardioName: string,
  functionToMeasure: Function,
  cardioCallback: Function
) => {
  return async (...args: []) => {
    let startTime = 0;
    let stopTime = 0;
    const invocation = {
      duration: 0,
      applicationError: false,
    };
    try {
      startTime = performance.now();
      const returnedValue = await functionToMeasure(...args);
      stopTime = performance.now();
      invocation.duration = stopTime - startTime;
      cardioCallback(cardioName, invocation, args);
      return returnedValue;
    } catch (err) {
      invocation.applicationError = true;
      stopTime = performance.now();
      invocation.duration = stopTime - startTime;
      cardioCallback(cardioName, invocation, args);
      throw err;
    }
  };
};

export default cardioWrapper;
