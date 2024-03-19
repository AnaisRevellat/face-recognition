import React from "react";
import styles from "./register.module.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("http://localhost:3500/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          // if the user has an ID > register is okay
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          // we display the server response if it fails
          console.log("Error during register :", user.message);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête d'enregistrement :", error);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.onRouteChange("home");
  };
  render() {
    return (
      <div className={styles.form_container}>
        <div className={`${styles.sign_form} sign_form`}>
          <h2>Register</h2>
          <div className={styles.sign_form__subdiv}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={this.onNameChange}
            />
          </div>
          <div className={styles.sign_form__subdiv}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={this.onEmailChange}
            />
          </div>
          <div className={styles.sign_form__subdiv}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.onPasswordChange}
            />
          </div>

          <button
            href="/"
            type="submit"
            className="a_btn liquid btn_register"
            onClick={this.onSubmitSignIn}
          >
            <span>
              <strong>Register</strong>
            </span>
            <div className="liquid"></div>
          </button>
    
        </div>
      </div>
    );
  }
}

export default Register;
