import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import Etudiant from './pages/Etudiant';
import Enseignant from "./pages/Enseignant";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/",
      element: <Login />, 
    },
    {
      path: "/etudiant",  
      element: <Etudiant />,
    },
    {
      path: "/enseignant",  
      element: <Enseignant />,
    },
  ];
  
  let routesElement = useRoutes(routesArray);
  
  return (
    <AuthProvider>
      <div className="w-full h-screen flex flex-col">
        {routesElement}
      </div>
    </AuthProvider>
  );
}

export default App;
