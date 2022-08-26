import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/init";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import axios from "axios";
import type { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Button from "react-bootstrap/Button";
import { useRef, createContext, useState, useContext } from "react";

export interface profile {
  profile: Profile[];
}

export interface Profile {
  id: number;
  name: string;
  career: string;
  foreword: string;
  email: string;
  twitter: string;
  works: Work[];
  Skill: Skill[];
}

export interface Skill {
  id: number;
  name: string;
  profileId: number;
  levelId: number;
}

export interface Work {
  id: number;
  title: string;
  content: string;
  profileId: number;
  image: null;
  favorite: number;
}

export default function Signin(props: profile) {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        // ログインした場合
        <>
          {console.log(props)}
          <h1>My Page</h1>
          <div>
            <li>
              <Link href="/login/myform">profile</Link>
            </li>
            <li>
              <Link href="/login/new">new</Link>
            </li>
            <li>
              works
              {props.profile[0].works.map((item, i) => {
                return (
                  <ul key={i}>
                    <Link
                      href={{
                        pathname: "/login/myworkform",
                        query: { id: item.id },
                      }}
                    >
                      {item.title}
                    </Link>
                  </ul>
                );
              })}
              <ul>
                <Link href="/login/upload">画像upload</Link>
              </ul>
            </li>
            <li>
              skills
              {props.profile[0].Skill.map((item, i) => {
                return (
                  <ul key={i}>
                    <Link
                      href={{
                        pathname: "/login/myskillsform",
                        query: { id: item.id },
                      }}
                    >
                      {item.name}
                    </Link>
                  </ul>
                );
              })}
            </li>
          </div>

          <SignOutButton />
        </>
      ) : (
        // していない場合
        <SignInButton />
      )}
    </>
  );
}

function SignInButton() {
  const emailRef = useRef(null);
  const emailPassword = useRef(null);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(emailRef.current.value, emailPassword.current.value);
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      emailPassword.current.value
    )
      .then((d) => {
        console.log("success > d", d);
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <>
      <div className={styles.login}>
        <form className={styles.login}>
          <label>email:</label>
          <input name="email" type="email" ref={emailRef} />
          <label>password:</label>
          <input name="password" type="password" ref={emailPassword} />
          <Button
            variant="outline-secondary"
            onClick={handleSubmit}
            className={styles.login}
          >
            サインイン
          </Button>
        </form>
        <Button variant="outline-secondary" className={styles.login}>
          <Link href="/">キャンセル</Link>
        </Button>
      </div>
    </>
  );
}

function SignOutButton() {
  return (
    <Button variant="outline-secondary" onClick={() => auth.signOut()}>
      <p>
        <Link href="/">サインアウト</Link>
      </p>
    </Button>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get("http://node:3000/my");
  const data = res.data;
  return {
    props: data,
  };
};
