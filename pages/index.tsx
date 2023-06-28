import Head from "next/head";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "../public/css/styled.module.css";
import { Backdrop, Button, Fade, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Spline from "@splinetool/react-spline";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const bgSolution = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const router = useRouter();
  // login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // register
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(true);
  const closeModal = () => setModal(false);
  // login function
  async function handlevent(event: any) {
    event.preventDefault();
    const payload = { username, password };
    const login: any = await signIn("credentials", {
      ...payload,
      redirect: false,
    });
    if (login.ok == false) {
      return router.replace("/");
    } else {
      return router.replace("/movie");
    }
  }
  // register function
  const handleRegis = async (event: any) => {
    event.preventDefault();
    let obj = {
      name: user,
      pass: pass,
    };
    let res = await axios.post("/api/regis", obj);
    // console.log("res", res.data.payload);
    setModal(false);
  };

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spline
        className={styled.ab_3d}
        scene="https://draft.spline.design/WwS7WSPKa9U1OLbY/scene.splinecode"
      />
      <main>
        <h1 className="title">Welcome to Cinemo</h1>
        <div className={styled.bg_controller}>
          <form onSubmit={(event) => handlevent(event)}>
            <div className={styled.intereactive_box}>
              <TextField
                fullWidth
                label="Username"
                name="user"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className={styled.intereactive_box}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="pass"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className={`${styled.intereactive_box} ${styled.flex_login}`}>
              <Button size="medium" variant="contained" type="submit">
                Login
              </Button>
              <Button size="medium" variant="contained" onClick={handleModal}>
                Registor
              </Button>
            </div>
          </form>
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modal}
          onClose={closeModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={modal}>
            <Box sx={bgSolution}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Register
              </Typography>
              <div className={styled.intereactive_box}>
                <TextField
                  fullWidth
                  label="Username"
                  name="name"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                />
              </div>
              <div className={styled.intereactive_box}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="pass"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                />
              </div>
              <div className={styled.intereactive_box}>
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  onClick={(event) => handleRegis(event)}
                >
                  Register
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </main>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer> */}

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
          color: #fff;
          margin-bottom: 15px;
          text-shadow: 3px 3px #00000079;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
