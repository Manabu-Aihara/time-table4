import { style } from '@vanilla-extract/css';

export const tabMenu = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  height: "15vh",
  marginTop: "5vh"
});

export const tabButton = style({
  color: "springgreen",
  fontSize: "larger",
  fontWeight: "bold",
  width: "50%",
});
