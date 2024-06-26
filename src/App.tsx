import React from 'react';
import './App.css';
import WeatherComponent from "./components/WeatherComponent/WeatherComponent";
import Header from "./common/Header/Header";
function App() {
  return (
    <main className="App">
      <Header/>
      <WeatherComponent/>
    </main>
  );
}

export default App;
