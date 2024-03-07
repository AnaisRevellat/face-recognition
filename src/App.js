import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import Particles from "react-tsparticles";
// import Clarifai from "clarifai";

import { loadFull } from "tsparticles";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import { BrowserRouter as Router } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = "139699273de549a78a5e1c922bb0952e";
  const USER_ID = "hexia_valten77";
  const APP_ID = "8lilqn";
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: "",
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const loadParticles = useCallback(async (engine) => {
    console.log(engine);
    if (engine) {
      // Ensure the engine is not undefined before calling addParticleUpdater
      await loadFull(engine);
    }
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  useEffect(() => {
    loadParticles();
  }, [loadParticles]);

  //cors is installed in the backend to make this fetch
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3500/');
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error when trying to catch data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onBtnSubmit = async () => {
    setImageUrl(input);

    const response = await fetch(
      `https://api.clarifai.com/v2/models/face-detection/outputs`,
      returnClarifaiRequestOptions(input)
    );
    const data = await response.json();
    console.log("data", data);
    displayFaceBox(calculateFaceLocation(data));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

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

        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />

        {route === "home" ? (
          <>
            <Logo />
            <ImageLinkForm
              onInputChange={onInputChange}
              onBtnSubmit={onBtnSubmit}
            />
            <Rank />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </>
        ) : route === "signin" ? (
          <Signin onRouteChange={onRouteChange} />
        ) : (
          <Register onRouteChange={onRouteChange} />
        )}
      </div>
    </Router>
  );
};

export default App;
