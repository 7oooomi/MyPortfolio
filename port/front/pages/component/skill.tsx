import axios, { AxiosResponse } from "axios";
import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

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

export default function Skill(props: skills) {
  return (
    <>
      {console.log(props.skills)}
      {props.skills.map((item, index) => {
        return (
          <>
            <div key={index}>
              <>{item.level.name}</>
              {item.name}
            </div>
          </>
        );
      })}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = await fetch(`http://node:3001/skills`);
  const data = await res.json();
  return {
    props: { data },
  };
};
