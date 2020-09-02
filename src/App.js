import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.css";

// page import
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Blogs from "./pages/Blogs";
import NotFound from "./pages/NotFound";

// component import
import Background from "./components/particle_bg";
import Copyright from "./components/copyright";
import Navigation from "./components/navigation";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Background />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/blogs" component={Blogs} />
          <Route component={NotFound} />
        </Switch>
        <br />
        <br />
        <div className="navigation-container">
          <Navigation />
        </div>
        <footer>
          <Copyright />
        </footer>
      </Router>
    </div>
  );
}
