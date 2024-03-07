import React from "react";
import styles from "./signin.module.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("http://localhost:3500/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "success") {
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className={styles.form_container}>
        <div className={styles.sign_form}>
          <h2>Sign In</h2>
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
          <button onClick={this.onSubmitSignIn} type="submit">
            Sign in
          </button>
          <div className={styles.sign_form__subdiv}>
            <p onClick={() => onRouteChange("register")} href="#0">
              Register
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
