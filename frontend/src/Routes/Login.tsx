import React, { useEffect } from "react";

const Login = () => {
  // Effacer le calendrier quand on vient sur la page de login
  useEffect(() => {
    document.getElementById("container")?.remove();
  }, []);

  return (
    <main>
      <h1>Login</h1>
    </main>
  );
};

export default Login;
