import axios, { AxiosResponse } from "axios";
import { GetStaticProps } from "next";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/init";
import { useState } from "react";

export interface Profile {
  id: number;
  name: string;
  career: string;
  foreword: string;
  email: string;
  twitter: string;
  image: string;
}

export default function About(props: Profile) {
  const [image, setImage] = useState("");
  const gsRef = ref(storage, `gs://port-fd24b.appspot.com/${props.image}`);
  getDownloadURL(gsRef)
    .then((url) => {
      setImage(url);
      console.log("ok");
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <>
      <Header />
      <h1>about</h1>
      {console.log(props)}
      <div>
        {props.name}
        <p>{props.career}</p>
      </div>
      <div>
        <img src={image} alt="" />
      </div>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = await fetch(`http://node:3000/`);
  const data = await res.json();
  const work = data.profile[0];
  return {
    props: work,
  };
};
