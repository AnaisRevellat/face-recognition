import "./App.css";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Logo />

        {/* <ImageLinkForm />
    <FaceRecognition /> */}
      </div>
    </Router>
  );
}

export default App;
