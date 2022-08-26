import { signInWithPopup } from "@firebase/auth";
import { auth, provider } from "../../firebase/init";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import axios from "axios";
import type { GetServerSideProps } from "next";

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
    <div>
      {user ? (
        // ログインした場合
        <>
          {console.log(props)}
          <h1>My Page</h1>
          {/* <div>
            <li>
              <Link href="/login/myform">profile</Link>
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
          </div> */}

          <SignOutButton />
        </>
      ) : (
        // していない場合
        <SignInButton />
      )}
    </div>
  );
}

function SignInButton() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <button onClick={signInWithGoogle}>
      <p>サインイン</p>
    </button>
  );
}

function SignOutButton() {
  return (
    <button onClick={() => auth.signOut()}>
      <p>サインアウト</p>
    </button>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get("http://localhost:3000/my");
  const data = res.data;
  return {
    props: data,
  };
};
