import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/init";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import axios from "axios";
import type { GetServerSideProps } from "next";
import styles from "../../styles/Home.module.css";
import Button from "react-bootstrap/Button";
import { useRef, createContext, useState, useContext } from "react";
import Router, { useRouter } from "next/router";

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
  const router = useRouter();
  const [user] = useAuthState(auth);

  const DelWork = (id: number, e: any) => {
    console.log(id);
    axios.delete(`http://localhost:3000/works/${id}`).then((res) => {
      console.log(res);
      console.log("削除");
      return router.push("/login");
    });
  };

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
                  <div key={i}>
                    <ul>
                      <Link
                        href={{
                          pathname: "/login/myworkform",
                          query: { id: item.id },
                        }}
                      >
                        {item.title}
                      </Link>
                    </ul>
                    <ul>
                      <Button
                        variant="outline-secondary"
                        onClick={(e) => DelWork(item.id, e)}
                      >
                        削除
                      </Button>
                    </ul>
                  </div>
                );
              })}
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
  const router = useRouter();
  const emailRef = useRef(null);
  const emailPassword = useRef(null);
  const handleSubmit = () => {
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
        return router.push("/error");
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
      <Link href="/login">サインアウト</Link>
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
