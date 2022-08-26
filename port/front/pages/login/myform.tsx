import axios from "axios";
import { useState, useEffect } from "react";
import type { GetServerSideProps } from "next";
import type { ChangeEvent } from "react";
import Link from "next/link";
import Form from "react-bootstrap/Form";

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
        <Form>
          <Form.Group>
            <Form.Label>name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>経歴:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={career}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setCareer(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>前置き:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={foreword}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setForeword(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>email:</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>twitter_acount:</Form.Label>
            <Form.Control
              type="text"
              value={twitter}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTwitter(e.target.value)
              }
            />
          </Form.Group>

          <button type="submit" onClick={handleClick}>
            upData
          </button>
        </Form>
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
