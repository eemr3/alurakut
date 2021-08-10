import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setCookie } from "nookies";
import useAuth from "../src/hooks/useAuth";

export default function LoginScreen() {
  const { user, signin } = useAuth();
  const [loginUser, setLoginUser] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    setCookie(null, "LOGIN_USER", loginUser, {
      maxAge: 86400,
      path: "/",
    });
    signin();
  }

  return (
    <main
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <form className="box">
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <br />
            <input
              placeholder="Usuário"
              onChange={(event) => setLoginUser(event.target.value)}
              value={loginUser}
            />
            <button type="submit" onClick={handleLogin}>
              <FontAwesomeIcon icon={["fab", "github"]} size="1x" /> Login
            </button>
          </form>

          <footer className="box">
            <p>Realise seu logn In usando o Github</p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{" "}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{" "}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
