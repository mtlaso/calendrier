import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../Styles/auth-page-styles.css";

import { AUTH_VALIDATION } from "../config";

type ErrorType = {
  field: string;
  errors: string[];
};

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<ErrorType[] | null>(null);

  // Effacer le calendrier quand on vient sur la page de login
  useEffect(() => {
    document.getElementById("container")?.remove();
  }, []);

  const HandleForm = async (e: React.FormEvent) => {
    // Vider setErrors
    setErrors([]);
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    // Valider champs
    const username_l = username.trim().length;
    if (username_l < AUTH_VALIDATION.username_min_length || username_l > AUTH_VALIDATION.username_max_length) {
      setErrors((e) => [
        ...e!,
        {
          field: "username",
          errors: [
            `Username must be between ${AUTH_VALIDATION.username_min_length} and ${AUTH_VALIDATION.username_max_length} characters.`,
          ],
        },
      ]);
    }

    const password_l = password.trim().length;
    if (password_l < AUTH_VALIDATION.password_min_length || password_l > AUTH_VALIDATION.password_max_length) {
      setErrors((e) => [
        ...e!,
        {
          field: "username",
          errors: [
            `Password must be between ${AUTH_VALIDATION.password_min_length} and ${AUTH_VALIDATION.password_max_length} characters.`,
          ],
        },
      ]);
    }

    // Afficher erreurs
    if (errors && errors?.length > 0) {
      return;
    }

    // Envoyer formulaire
    try {
      const body = JSON.stringify({ username, password });
      const req = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const res = await req.json();
      alert(`res: ${JSON.stringify(res)}`);
    } catch (error) {
      alert(`error: ${error}`);
    }
    return;
  };

  return (
    <main className="container-auth">
      <h1>Login to your account</h1>
      <p>Login to your account to be able to save and sync your events across all your devices.</p>
      <form onSubmit={HandleForm}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          minLength={AUTH_VALIDATION.username_min_length}
          maxLength={AUTH_VALIDATION.username_max_length}
          autoFocus
          placeholder="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Afficher erreurs avec username */}
        {errors && errors[0].field === "username" && (
          <ul>
            {errors[0].errors.map((error) => {
              return (
                <li key={error} className="error">
                  {error}
                </li>
              );
            })}
          </ul>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={AUTH_VALIDATION.password_min_length}
          maxLength={AUTH_VALIDATION.password_max_length}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Afficher erreurs avec password */}
        {errors && errors[1].field === "password" && (
          <ul>
            {errors[0].errors.map((error) => {
              return (
                <li key={error} className="error">
                  {error}
                </li>
              );
            })}
          </ul>
        )}

        <Link to="/register" className="link">
          Create an account
        </Link>
        <Link to="/" className="link">
          Go back
        </Link>
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default Login;
