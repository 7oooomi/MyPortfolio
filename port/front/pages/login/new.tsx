import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import Link from "next/link";

export interface Work {
  id: number;
  title: string;
  content: string;
  profileId: number;
  image: null;
  favorite: number;
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

export default function New(props: any) {
  // work
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // skill
  const [name, setName] = useState("");
  const [levelId, setLevelId] = useState("");
  //   クリック時
  const workhandleClick = async (e: any) => {
    e.preventDefault();
    const work = {
      title,
      content,
      favorite: "0",
      profileId: "1",
    };
    await axios.post("http://localhost:3000/works", work).then((res) => {
      alert("ok");
      console.log("送信");
      console.log(res);
    });
  };

  const skillhandleClick = async (e: any) => {
    e.preventDefault();

    const skill = {
      name,
      levelId,
    };
    await axios.post("http://localhost:3000/skills", skill).then((res) => {
      alert("ok");
      console.log("送信");
      console.log(res);
    });
  };

  return (
    <>
      <h1>New work / skill</h1>
      <form>
        <div>
          <h3>work:</h3>
          <p>title</p>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          ></input>
          <div>
            <p>content</p>
            <textarea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
            ></textarea>
          </div>
          <div>
            <p>
              <button onClick={workhandleClick}>New</button>
            </p>
          </div>
        </div>
      </form>

      <form>
        <div>
          <h3>skill</h3>
          <p>name</p>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          ></input>
          <p>skill</p>
          {console.log(props)}
          <select
            value={levelId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setLevelId(e.target.value)
            }
          >
            <option value="-----"></option>

            {props.data.map((item: { id: number; name: string }) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <div>
            <p>
              <button onClick={skillhandleClick}>New</button>
            </p>
          </div>
        </div>
      </form>
      <Link href="/login">戻る</Link>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(`http://node:3000/level`);
  const data = await res.data;
  return {
    props: {
      data: data,
    },
  };
};
