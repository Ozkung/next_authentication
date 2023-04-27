import Button from "@mui/material/Button";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "../../public/css/styled.module.css";
import MovieObject from "../../components/movieObject";
import { useEffect, useState } from "react";
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
  p: "5px",
};

const exsampleUser = {
  _id: "",
  name: "",
  pass: "",
  token: "",
  favorite: [],
  createDate: "",
};

export default function movie(props: any) {
  const router = useRouter();
  const [movies, setMove] = useState([]);
  // const {  } = props.data;
  const user = props.user.name;
  let [movieItem, setMovie] = useState({
    id: 1957,
    movieCode: ["HO00004537"],
    title_en: "The Pope Exorcist",
    title_th: "โป๊บปราบผี",
    rating: "ทป.",
    rating_id: 0,
    duration: 103,
    release_date: "2023-04-26",
    sneak_date: "2022-08-17",
    synopsis_th:
      "ด้วยแรงบันดาลใจจากแฟ้มเหตุการณ์จริงเกี่ยวกับบาทหลวงกาเบรียล อามอร์ธ หัวหน้านักปราบผีแห่งนครวาติกัน The Pope’s Exorcist เล่าเรื่องของอามอร์ธ (รัสเซล โครว์ เจ้าของรางวัลอคาเดมี อวอร์ด) ในตอนที่เขาสืบเรื่องของการถูกปีศาจเข้าสิงที่น่าสะพรึงกลัวของเด็กชายคนหนึ่ง แต่สุดท้าย เขากลับได้เปิดโปงการสมคบคิดยาวนานหลายร้อยปีที่วาติกันพยายามอย่างเหลือเกินที่จะซ่อนไว้\r\n",
    synopsis_en:
      "Portrayal of a real-life figure Father Gabriele Amorth, a priest who acted as chief exorcist of the Vatican and who performed more than 100,000 exorcisms in his lifetime. (He passed away in 2016 at the age of 91.) Amorth wrote two memoirs -- An Exorcist Tells His Story and An Exorcist: More Stories -- and detailed his experiences battling Satan and demons that had clutched people in their evil.\r\n",
    director: "Julius Avery",
    actor:
      "Paloma Bloyd/Russell Crowe/Franco Nero/Ralph Ineson/Alex Essoe/Daniel Zovatto/Laurel Marsden/Cornell S. John",
    genre: "Horror",
    poster_ori: "/uploads/movie/3554/thumb_3554.jpg",
    poster_url:
      "https://cdn.majorcineplex.com/uploads/movie/3554/thumb_3554.jpg?v=202304280027",
    trailer: "https://cdn.majorcineplex.com/embed/7403",
    tr_ios:
      "http://27.254.80.209:1935/media/_definst_/mp4:major/trailer/7403/7403_720.mp4/playlist.m3u8",
    tr_hd:
      "rtsp://27.254.80.209:1935/media/_definst_/mp4:major/trailer/7403/7403_720.mp4",
    tr_sd:
      "rtsp://27.254.80.209:1935/media/_definst_/mp4:major/trailer/7403/7403_360.mp4",
    tr_mp4:
      "https://cdn.majorcineplex.com/uploads/trailer/rawvideo/7403/7403.mp4",
    priority: "79000",
    now_showing: "1",
    advance_ticket: "0",
    date_update: "2023-04-26 11:12:51",
    show_buyticket: "1",
    trailer_cms_id: "7403",
    trailer_ivx_key: "2508534",
  });
  const [modal, setModal] = useState(false);
  let [favor, setFavor] = useState(exsampleUser);

  useEffect(() => {
    let urls: string = `http://localhost:3000/api/favor?id=${props.user.id}`;
    async function api() {
      let resp: any = await fetch(urls)
        .then((res) => res.json())
        .then((resJSON) => {
          console.log("resJSON :", resJSON);
          setFavor(resJSON.payload);
          setMove(props.data.movies);
        });
    }
    api();
  }, []);
  const openModal = (item: any) => {
    setMovie(item);
    setModal(true);
  };
  const closeModal = () => setModal(false);
  async function logout() {
    await signOut({ redirect: false });
    return router.replace("/");
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className={styled.accountlog}>{user}&nbsp;</div>
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
              favor={favor.favorite}
              read={openModal}
              key={index}
            />
          );
        })}
      </div>
      <Modal open={modal} onClose={closeModal}>
        <Box sx={bgSolution}>
          <div className={styled.popout_movie}>
            <img
              width="380px"
              src={movieItem?.poster_url}
              alt={movieItem?.title_en}
            />
            <div
              style={{
                padding: "8px",
              }}
            >
              <Typography id="modal-modal-title1" variant="h6" component="h2">
                {movieItem?.title_en}
              </Typography>
              <Typography id="modal-modal-title2" variant="h6" component="h3">
                {movieItem?.genre}
              </Typography>
              <Typography
                id="modal-modal-description1"
                component="div"
                variant="caption"
              >
                <br />
                <div style={{ width: "380px" }}>
                  <span style={{ fontWeight: 600 }}>Category :</span>&nbsp;
                  {movieItem?.genre}
                </div>
                <div style={{ width: "380px" }}>
                  <span style={{ fontWeight: 600 }}>Director :</span>&nbsp;
                  {movieItem?.director}
                </div>
                <div style={{ width: "380px" }}>
                  <span style={{ fontWeight: 600 }}>Actor :</span>&nbsp;
                  {movieItem?.actor}
                </div>
                <div style={{ width: "380px" }}>
                  <span style={{ fontWeight: 600 }}>Rating :</span>&nbsp;
                  {movieItem?.rating}
                </div>
                <div style={{ width: "380px" }}>
                  <span style={{ fontWeight: 600 }}>Release date :</span>&nbsp;
                  {movieItem?.release_date}
                </div>
              </Typography>
              <Typography
                id="modal-modal-description2"
                color="text.secondary"
                variant="body2"
                component="div"
                paragraph
                sx={{ mt: 2 }}
              >
                <div
                  style={{
                    height: "400px",
                    overflowY: "scroll",
                    width: "380px",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;{movieItem?.synopsis_en}
                </div>
              </Typography>
            </div>
          </div>
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
