import axios, { AxiosResponse } from "axios";
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

export default function My(props: profile) {
  return <>{console.log(props.profile[0])}</>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get("http://node:3000/my");
  const data = res.data;
  return {
    props: data,
  };
};
