import styled from "../public/css/styled.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function movieObject(props: any, read: Function) {
  const [favor, setFavor] = useState(false);

  async function saveList(event: any) {
    event.stopPropagation();
    setFavor(!favor);
  }
  function openmodal() {
    console.log("2 :", 2);
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
              <div className={styled.colorPrime} onClick={props.read}>
                Read more
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
