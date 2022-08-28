import type { GetServerSideProps } from "next";
import { useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import { postImage } from "../component/up";
import { useRouter } from "next/router";

export interface works {
  works: Work[];
}

export interface Work {
  id: number;
  title: string;
  content: string;
  profileId: number;
  image: string;
  favorite: number;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await axios.get(`http://node:3000/works/${id}`);
  const data = res.data.work[0];
  return {
    props: data,
  };
};

export default function WorkForm(props: Work) {
  const [title, setTitle] = useState(`${props.title}`);
  const [content, setContent] = useState(`${props.content}`);
  const [image, setImage] = useState(null);
  const [url, setURL] = useState("");

  const uploadToClient = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setImage(file.name);
      setURL(URL.createObjectURL(file));
    }
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    const result = postImage(image);
    console.log(result);

    const data = {
      title,
      content,
      favorite: 0,
      image: image,
    };

    axios.put(`http://localhost:3000/works/${props.id}`, data).then((res) => {
      console.log("ok");
      console.log(res);
    });
  };

  return (
    <>
      {console.log(props)}
      {console.log(image)}

      <Form>
        <Form.Group>
          <Form.Label>アプリ名：</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>説明:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>image:</Form.Label>
          <img src={url} />
          <Form.Label htmlFor="file-input"></Form.Label>
          <Form.Control
            type="file"
            id="file-input"
            accept="image/*"
            onChange={uploadToClient}
          />
        </Form.Group>
        <Button variant="outline-secondary" type="submit" onClick={handleClick}>
          <Link href="/login">upData</Link>
        </Button>
      </Form>
      <Button variant="outline-secondary">
        <Link href="/login">キャンセル</Link>
      </Button>
    </>
  );
}
