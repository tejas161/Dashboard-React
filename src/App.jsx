import React from 'react';
import SearchBar from "./components/SearchBar/SearchBar"
import Accordion from "./components/Accordion/Accordion"


function App() {
return (
    <>
    <div style={{
      width:'80%',
      margin:'auto',      
    }}>
    <SearchBar/>
   <Accordion/>  
  </div>
   </>
  )
}

export default App;
