import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { getUserData } from "../api/services/userData-service";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import UserData from "../api/models/UserData";
import '../styles/Dashboard.css'

export default function Dashboard() {
  const token = useSelector((state: RootState) => state.auth.token); // Ottengo il token dallo stato di Redux tramite useSelector
  const [userData, setUserData] = useState<UserData | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const data = await getUserData(token);
          setUserData(data); // Metto i dati all'interno dello stato userData
        } catch (err) {
          console.error("Errore nel recupero dei dati utente:", err);
        }
      }
    };
    fetchData();
  }, [token]);

  // Se userData non è presente, mostro il messaggio di loading
  if (!userData) return <div>Loading...</div>;

  // Funzione per gestire il logout
  const handleLogout = () => {
    // elimino il token dal localStorage
    localStorage.removeItem("Token");
    localStorage.removeItem("Refresh token");
    // Dispatch dell'azione di logout per aggiornare lo stato globale
    dispatch(logout());
    // reindirizzo alla pagina di login
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Benvenuto, {userData.name}</h2>
      <p>Email: {userData.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}