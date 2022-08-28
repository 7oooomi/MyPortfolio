import axios from "axios";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import type { ChangeEvent } from "react";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import { postImage } from "../component/up";

export interface Profile {
  id: number;
  name: string;
  career: string;
  foreword: string;
  email: string;
  twitter: string;
  image: string;
}

export default function UserForm(props: Profile) {
  const [name, setName] = useState(props.name);
  const [career, setCareer] = useState(props.career);
  const [foreword, setForeword] = useState(props.foreword);
  const [email, setEmail] = useState(props.email);
  const [twitter, setTwitter] = useState(props.twitter);
  const [image, setImage] = useState(null);
  const [url, setURL] = useState("");

  const uploadToClient = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setImage(file);
      setURL(URL.createObjectURL(file));
    }
  };

  const handleClick = () => {
    const result = postImage(image);
    console.log(result);

    const data = {
      name,
      career,
      foreword,
      email,
      twitter,
      image: image.name,
    };

    axios.put("http://localhost:3000", data).then((res) => {
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
          <Form.Group>
            <Form.Label>image:</Form.Label>
            <Form.Label>{props.image}</Form.Label>
            <div>
              <img src={url} />
            </div>
            <Form.Label htmlFor="file-input"></Form.Label>
            <Form.Control
              type="file"
              id="file-input"
              accept="image/*"
              onChange={uploadToClient}
            />
          </Form.Group>
          <div>
            <Button
              variant="outline-secondary"
              type="submit"
              onClick={handleClick}
            >
              upData
            </Button>
          </div>
        </Form>
        <Button variant="outline-secondary">
          <Link href="/login">戻る</Link>
        </Button>
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
