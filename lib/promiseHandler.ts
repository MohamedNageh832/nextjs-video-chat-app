type PromiseHandlerFn = <T>(
  promise: Promise<T>
) => Promise<[T, null] | [null, any]>;

export const promiseHandler: PromiseHandlerFn = async (promise) => {
  try {
    const res = await promise;
    return [res, null];
  } catch (err) {
    return [null, err];
  }
};
