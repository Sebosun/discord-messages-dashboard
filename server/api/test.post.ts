type Brand<K, T> = K & { __brand: T };

type Password = Brand<string, `"Password"`>;

export default defineEventHandler((event) => {
  const body = getQuery(event);
  return { body };
});
