import logo from './logo.svg';
import './App.css';
import Stores from './pages/Stores';
import StoreDetails from './pages/StoreDetails';
import {
  Routes,
  Route,
  Redirect
} from "react-router-dom";
import { auth } from './firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Fragment, useEffect, useState } from 'react';
import LogInPage from './pages/LogInPage';
import Vendas from './pages/Vendas';

function App() {

  const [user, setUser] = useState('');


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user)
        // ...
      } else {
        // User is signed out
        // ...
        setUser('')
      }
    });
    return () => {

    };
  }, []);

  return (
    <div className="App">
      <Routes>

        <Fragment>

          <Route path="/" element={<Stores />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/storedetails/:storeid" element={<StoreDetails />} />
        </Fragment>


      </Routes>

    </div>
  );
}

export default App;
