import axios from "axios";
import { useState, useEffect } from "react";
import type { GetServerSideProps } from "next";
import type { ChangeEvent } from "react";
import Link from "next/link";

export interface Profile {
  id: number;
  name: string;
  career: string;
  foreword: string;
  email: string;
  twitter: string;
}

export default function UserForm(props: Profile) {
  const [name, setName] = useState(props.name);
  const [career, setCareer] = useState(props.career);
  const [foreword, setForeword] = useState(props.foreword);
  const [email, setEmail] = useState(props.email);
  const [twitter, setTwitter] = useState(props.twitter);

  const handleClick = async (e: any) => {
    e.preventDefault();

    const data = {
      name,
      career,
      foreword,
      email,
      twitter,
    };

    await axios.put("http://localhost:3000", data).then((res) => {
      console.log("ok");
      console.log(res);
    });
  };

  return (
    <>
      {console.log(props)}
      <div>
        <form>
          <label>name:</label>
          <input
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />

          <label>経歴:</label>
          <textarea
            value={career}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setCareer(e.target.value)
            }
          />

          <label>前置き:</label>
          <textarea
            value={foreword}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setForeword(e.target.value)
            }
          />

          <label>email:</label>
          <input
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <label>twitter_acount:</label>
          <input
            value={twitter}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTwitter(e.target.value)
            }
          />

          <button type="submit" onClick={handleClick}>
            upData
          </button>
        </form>
        <Link href="/login">戻る</Link>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get("http://node:3000/");
  const data = res.data.profile[0];
  return {
    props: data,
  };
};
