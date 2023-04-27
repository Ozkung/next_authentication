import styled from "../public/css/styled.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function movieObject(props: any) {
  const [favor, setFavor] = useState(
    props.favor.includes(parseInt(props.render.id))
  );
  async function saveList(event: any) {
    event.stopPropagation();
    let res = await axios.post("http://localhost:3000/api/favor", {
      uid: props.id,
      item_id: props.render.id,
    });
    setFavor(!favor);
    if (res.data.payload) props.fetch();
  }
  return (
    <>
      <Card sx={{ maxWidth: 345 }} style={{ cursor: "context-menu" }}>
        <CardActionArea
          disableRipple
          //   onClick={openmodal}
          style={{ cursor: "context-menu" }}
        >
          <CardMedia
            component="img"
            height="545"
            image={props.render.poster_url}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={styled.flex_title}
            >
              {props.render.title_en}
            </Typography>
            <Typography
              component="div"
              variant="body2"
              color="text.secondary"
              className={styled.detail_length}
            >
              {props.render.synopsis_en}
            </Typography>
            <div className={styled.flex_grid}>
              <div
                style={{ cursor: "pointer" }}
                onClick={(event) => saveList(event)}
              >
                <FavoriteIcon color={favor ? "error" : "disabled"} />
              </div>
              <div
                className={styled.colorPrime}
                onClick={(event) => props.read(props.render)}
              >
                Read more
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
