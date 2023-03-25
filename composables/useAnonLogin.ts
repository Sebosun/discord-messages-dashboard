// there's no way to create 'anonymous' accounts on supabase
// so this file is a hacky workaround
export const useAnonLogin = () => {
  const client = useSupabaseAuthClient();

  // generate a function named makeRandomThing that generates random hashes
  const makeRandomThing = (length: number) => {
    const result = [];
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  };

  // Login method using providers
  const login = async () => {
    const email = makeRandomThing(20) + "@fakemail.com";
    const password = makeRandomThing(20);

    await client.auth.signUp({ email, password });

    return await client.auth.getUser();
  };

  return { login };
};
