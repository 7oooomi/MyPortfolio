import Footer from "../component/Footer";
import Header from "../component/Header";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import axios from "axios";

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

export default function Works(props: works) {
  return (
    <>
      {console.log(props.works)}
      <Header />
      <main>
        <h1>works</h1>
        <div></div>
        <>
          {props.works.map((item, i) => {
            return (
              <div key={i}>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            );
          })}
        </>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = await axios.get("http://node:3000/works");
  const data = res.data;
  return {
    props: data,
  };
};
