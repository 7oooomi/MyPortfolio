import Footer from "./component/Footer";
import Header from "./component/Header";
import { GetStaticProps } from "next";
import axios from "axios";
import { Card } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/init";
import { useState } from "react";

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

export default function Works(props: works) {
  return (
    <>
      {console.log(props)}
      <Header />
      <main>
        <h1>works</h1>
        <div>
          <>
            {props.works.map((item, i) => {
              const [image, setImage] = useState("");
              const gsRef = ref(
                storage,
                `gs://port-fd24b.appspot.com/${item.image}`
              );
              getDownloadURL(gsRef).then((url) => {
                setImage(url);
              });

              return (
                <Card className={styles.card} key={i}>
                  <Card.Img variant="top" />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.content}</Card.Text>
                    <Card.Img src={image} alt=""></Card.Img>
                  </Card.Body>
                </Card>
              );
            })}
          </>
        </div>
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
