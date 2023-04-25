import Button from "@mui/material/Button";
import { GetStaticProps } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "../../public/css/styled.module.css";
import MovieObject from "../../components/movieObject";
import { useState } from "react";

export default function movie(props: any) {
  const router = useRouter();
  const [user, setUser] = useState("");
  async function getUser() {
    let session: any = await getSession();
    setUser(session?.user?.name);
  }
  getUser();
  if (user === null) router.replace("/");
  const { movies } = props;
  async function logout() {
    await signOut({ redirect: false });
    return router.replace("/");
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <div className={styled.accountlog}>{user ? user : "waitting.."}</div>
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      </div>
      <div className={styled.flex_movie}>
        {movies.map((item: any, index: number) => {
          return <MovieObject render={item} key={index} />;
        })}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const url = "https://www.majorcineplex.com/apis/get_movie_avaiable";
  const response = await axios.get(url);
  const res = JSON.parse(JSON.stringify(response.data));
  return {
    props: res,
  };
};
