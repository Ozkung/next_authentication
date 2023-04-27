import Button from "@mui/material/Button";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "../../public/css/styled.module.css";
import MovieObject from "../../components/movieObject";
import { useState, useEffect } from "react";
import { Box, Modal, Typography } from "@mui/material";

const bgSolution = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function movie(props: any) {
  const router = useRouter();
  const { movies } = props.data;
  const user = props.user.name;
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  async function logout() {
    await signOut({ redirect: false });
    return router.replace("/");
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className={styled.accountlog}>{user}</div>
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      </div>
      <div className={styled.flex_movie}>
        {movies.map((item: any, index: number) => {
          return (
            <MovieObject
              render={item}
              id={props.user.id}
              read={openModal}
              key={index}
            />
          );
        })}
      </div>
      <Modal open={modal} onClose={closeModal}>
        <Box sx={bgSolution}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const url = "https://www.majorcineplex.com/apis/get_movie_avaiable";
  const response = await axios.get(url);
  const session: any = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const res = { user: session.user, data: response.data };

  //   if (session == null) window.open("/");
  return {
    props: res,
  };
};
