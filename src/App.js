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
import DrawerComp from './components/DrawerComp';
import Items from './pages/Items';

function App() {

  const [user, setUser] = useState('');


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        setUser(user)
        // ...
      } else {
        // User is signed out
        setUser('')
      }
    });
  }, []);

  return (
    <div className="App" >
      <DrawerComp >

        {
          user && <Routes>

            <Fragment>

              <Route path="/" element={<Stores />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/vendas" element={<Vendas />} />
              <Route path="/items" element={<Items />} />
              <Route path="/storedetails/:storeid" element={<StoreDetails />} />
            </Fragment>


          </Routes>
        }
        {
          !user && <Routes>

            <Fragment>

              <Route path="/" element={<LogInPage />} />

            </Fragment>


          </Routes>
        }

      </DrawerComp>
    </div>
  );
}

export default App;
