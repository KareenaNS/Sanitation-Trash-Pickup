// import logo from './logo.svg';
// import './App.css';
// import React, { useState } from "react"; 
// import { ChakraProvider } from "@chakra-ui/react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import customTheme from "./index";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react"; 
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import customTheme from "./index";
import AddResidentForm from './components/AddResidentForm'; // Adjust the path as necessary
// import Home from './Home';
// import Result from './Result';
// import History from './History';
// import Login from "./Login"; 

import NavBar from './components/NavBar';
import Home from './components/Home';
import { Navigate } from 'react-router-dom';



const App = () => {
  const [username, setUsername] = useState(""); //store the username after login 
  
  return (
    <ChakraProvider theme={customTheme}>
        <BrowserRouter>
        <NavBar username={username} setUsername={setUsername} /> {/* Pass the username to NavBar */} 
        <Routes>
          
            {/* <Route path="/" element={!username ? <Login setUsername={setUsername} /> : <Navigate to="/home" />} /> */}
            <Route path="/" element={<Home />} /> {/* Show Home component */}
            <Route path="components/add-resident" element={<AddResidentForm />} />
            {/* Home page is shown after login */}
            {/*<Route path="/" element={<Home />} />*/}
            {/* <Route path="/history" element={<History />} /> 
            <Route path="/result" element={<Result />} /> */}
        </Routes>
        </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
