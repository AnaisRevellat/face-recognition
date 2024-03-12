import "./App.css";
import React, { Component } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import { BrowserRouter as Router } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "03841d455e9343ca966dc806e339f6fc",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  loadParticles = async (engine) => {
    console.log(engine);
    if (engine) {
      await loadFull(engine);
    }
  };

  particlesLoaded = async (container) => {
    await console.log(container);
  };

  componentDidMount() {
    this.loadParticles();
  }

  calculateFaceLocation = (data) => {
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

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onBtnSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict("face-detection", this.state.input)
      .then((response) => {
        console.log("hi", response);
        if (response) {
          fetch("http://localhost:3500/image", {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count}));
            });
        }

        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = "139699273de549a78a5e1c922bb0952e";
    const USER_ID = "hexia_valten77";
    const APP_ID = "8lilqn";

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
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

  render() {
    const { isSignedIn, route, box, imageUrl } = this.state;

    return (
      <Router>
        <div className="App">
          <Particles
            className="particles"
            id="tsparticles"
            init={this.loadParticles}
            loaded={this.particlesLoaded}
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

          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
          />

          {route === "home" ? (
            <>
              <Logo />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onBtnSubmit={this.onBtnSubmit}
              />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </>
          ) : route === "signin" ? (
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          ) : (
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )}
        </div>
      </Router>
    );
  }
}

export default App;
