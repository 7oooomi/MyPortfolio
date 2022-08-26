import axios from "axios";
import { useState, useEffect } from "react";
import type { GetServerSideProps } from "next";
import type { ChangeEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export interface skills {
  skills: Skill[];
}

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

export default function upSkill(props: skills) {
  const router = useRouter();
  let id = Number(router.query.id) - 1;
  console.log(id);

  const [name, setName] = useState(`${props.skills[id].name}`);
  const [levelId, setLevelId] = useState(`${props.skills[id].levelId}`);

  const handleClick = async (e: any) => {
    e.preventDefault();

    const data = {
      name,
      levelId,
    };
    id = id + 1;

    await axios.put(`http://localhost:3000/skills/${id}`, data).then((res) => {
      console.log("ok");
      console.log(res);
    });
  };

  return (
    <>
      <form>
        <label>name:</label>
        <input
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <label>level:{props.skills[id].level.name}</label>
        <input
          value={levelId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLevelId(e.target.value)
          }
        />
        <button type="submit" onClick={handleClick}>
          upData
        </button>
      </form>
      <Link href="/login">戻る</Link>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get("http://node:3000/skills");
  const data = res.data;
  return {
    props: data,
  };
};
