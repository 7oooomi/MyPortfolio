import Footer from "../component/Footer";
import Header from "../component/Header";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import styles from "../../styles/Home.module.css";

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
        <div>
          <>
            {props.works.map((item, i) => {
              return (
                <Card className={styles.card}>
                  <Card.Img variant="top" />
                  <Card.Body>
                    <div key={i}>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.content}</Card.Text>
                    </div>
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
