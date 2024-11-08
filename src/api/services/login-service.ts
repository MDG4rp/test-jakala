export const login = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
// in caso di backend sostituire cn una chiamata post
  if (email === "mario.rossi@mario.rossi" && password === "password") {
    return {
      token: "mocked-jwt-token",
      refreshToken: "mocked-refresh-token",
    };
  } else {
    throw new Error("Credenziali non valide. Riprova.");
  }
};
