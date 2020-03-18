import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./components/Home";
import Country from "./components/Country";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  document.title = "Covid-19 - ReactJs";
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/country/:country" component={Country} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
