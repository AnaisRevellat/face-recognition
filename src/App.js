import "./App.css";
import React, { useState } from "react";
import { useCallback } from "react";
import Particles from "react-tsparticles";

import { loadFull } from "tsparticles";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [userInput, setUserInput] = useState("");

  /*-------------Background settings-------------------------------------*/

  const loadParticles = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  /*--------------------------------------------------*/

  const onInputChange = (event) => {
    console.log(event.target.value);
  };

  const onBtnSubmit = () => {
    console.log('click');
  }

  return (
    <Router>
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          init={loadParticles}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#181414",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#80b3ff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />

        <Navigation />
        <Logo />
        <ImageLinkForm onInputChange={onInputChange} onBtnSubmit={onBtnSubmit} />
        <Rank />
        {/* 
    <FaceRecognition /> */}
      </div>
    </Router>
  );
};

export default App;
