import "./App.css";
import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import { BrowserRouter as Router } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";
import LoadingModal from "./components/LoadingModal";

const initialState = {
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
  loading: false, // modal state
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  showLoadingModal = () => {
    this.setState({ loading: true });
  };

  hideLoadingModal = () => {
    this.setState({ loading: false });
  };
  
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
    this.setState({ imageUrl: this.state.input, loading: true }); // Activer le chargement avant la requête
    fetch("https://face-recognition-api-nlv1.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        // Traitement de la réponse
        // Désactiver le chargement après 10 secondes
        setTimeout(() => {
          this.setState({ loading: false });
          // Rediriger vers la page d'accueil
          this.setState({ route: "home" });
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
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
    const { isSignedIn, route, box, imageUrl, loading } = this.state;

    return (
      <Router>
        <div className="App">
          {loading && <LoadingModal />}
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
          />
          {/* Afficher la modale de chargement si loading est true */}
          {route === "home" ? (
            <>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onBtnSubmit={this.onBtnSubmit}
              />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
              <Footer />
            </>
          ) : route === "signin" ? (
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
              showLoadingModal={this.showLoadingModal} // Cette ligne ne devrait pas être commentée
              hideLoadingModal={this.hideLoadingModal} 
            />
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