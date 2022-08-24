import axios, { AxiosResponse } from "axios";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";

export interface Profile {
  id: number;
  name: string;
  career: string;
  foreword: string;
  email: string;
  twitter: string;
}

export default function About(props: Profile) {
  return (
    <>
      <Header />
      <h1>about</h1>
      {console.log(props)}
      <div>
        {props.name}
        <p>{props.career}</p>
      </div>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = await axios.get("http://node:3000/");
  const data = res.data.profile[0];
  return {
    props: data,
  };
};
