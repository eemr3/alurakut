import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";

import firebase from "../../lib/firebase";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // const [githubUser, setGithubUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const provider = new firebase.auth.GithubAuthProvider();

  provider.addScope("read:user");
  const signin = () => {
    try {
      setLoading(true);

      return firebase
        .auth()
        .signInWithPopup(provider)
        .then((response) => {
          const user = response.user;

          setUser(user);
          router.push("/");
        });
    } finally {
      setLoading(false);
    }
  };

  const signout = () => {
    try {
      router.push("/login");
      return firebase
        .auth()
        .signOut()
        .then(() => setUser(null));
    } finally {
      setLoading(false);
      destroyCookie(null, "LOGIN_USER");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
