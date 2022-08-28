import axios from "axios";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import type { ChangeEvent } from "react";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export interface Skill {
  id: number;
  name: string;
  profileId: number;
  levelId: number;
  level: Level;
}

export interface Level {
  id: number;
  name: string;
}

export default function upSkill(props: Skill) {
  const [name, setName] = useState(`${props.name}`);
  const [levelId, setLevelId] = useState(`${props.levelId}`);

  const handleClick = async (e: any) => {
    const data = {
      name,
      levelId,
    };

    await axios
      .put(`http://localhost:3000/skills/${props.id}`, data)
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
          <Form.Label>level:{props.level.name}</Form.Label>
          <Form.Control
            type="text"
            value={levelId}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLevelId(e.target.value)
            }
          />
        </Form.Group>
        <Button variant="outline-secondary" type="submit" onClick={handleClick}>
          <Link href="/login">upData</Link>
        </Button>
      </Form>
      <Button variant="outline-secondary">
        <Link href="/login">戻る</Link>
      </Button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const res = await axios.get(`http://node:3000/skills/${id}`);
  const data = res.data.skill[0];
  return {
    props: data,
  };
};
