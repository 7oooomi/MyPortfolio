import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import Link from "next/link";
import { Form } from "react-bootstrap";

export interface works {
  works: Work[];
}

export interface Work {
  id: number;
  title: string;
  content: string;
  profileId: number;
  image: null;
  favorite: number;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const res = await axios.get(`http://node:3000/works/${id}`);
  const data = res.data;
  return {
    props: data,
  };
};

export default function WorkForm(props: any) {
  const [title, setTitle] = useState(`${props.work[0].title}`);
  const [content, setContent] = useState(`${props.work[0].content}`);

  const handleClick = async (e: any) => {
    e.preventDefault();

    const data = {
      title,
      content,
      favorite: 0,
    };

    await axios
      .put(`http://localhost:3000/works/${props.work[0].id}`, data)
      .then((res) => {
        console.log("ok");
        console.log(res);
      });
  };

  return (
    <>
      {console.log(props)}
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
        <button type="submit" onClick={handleClick}>
          upData
        </button>
      </Form>
      <Link href="/login">戻る</Link>
    </>
  );
}
