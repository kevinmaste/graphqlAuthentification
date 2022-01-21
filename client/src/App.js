import LoginComponents from "./components/Login.components";
import {Route, Routes} from "react-router-dom";
import RegisterComponents from "./components/Register.components";
import PrivateHome from "./pages/Private.Home";
import SecureRoutes from "./secure/Secure.Routes";

function App() {
    // const client = ...
    return (
    <div className="App">
        <Routes>
            <Route exact path="login" element={<LoginComponents/>} />
            <Route exact path="register" element={<RegisterComponents/>}/>
            <Route exact path="/"
                   element={
                       <SecureRoutes>
                           <PrivateHome/>
                       </SecureRoutes>
                   }
            />
        </Routes>
    </div>
  );
}

export default App;
