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
        if (user) {
          this.props.loadUser(user)
          this.props.onRouteChange("home");
        }
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.onRouteChange("home");
  };
  render() {
    return (
      <div className={styles.form_container}>
        <div className={styles.sign_form}>
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
            className={styles.register_btn}
            type="submit"
            onClick={this.onSubmitSignIn}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
