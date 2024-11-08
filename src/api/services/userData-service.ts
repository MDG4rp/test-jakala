import UserData from "../models/UserData";

const MOCK_USER_DATA: UserData = {
    id: 1,
    name: "Mario Rossi",
    email: "mario.rossi@mario.rossi"
};

export const getUserData = async (token: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (token === "mocked-jwt-token") {
        return MOCK_USER_DATA;
    } else {
        throw new Error("Token non valido. Riprova.");
    }
};