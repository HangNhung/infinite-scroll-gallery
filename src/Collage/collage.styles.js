import styled from "styled-components";

export const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  color: palevioletred;
  background: #fff;
`;

export const Container = styled.div`
  margin-top: 50px;
  text-align: center;
`;

export const Title = styled.h1`
  font-family: "Carter One";
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 25vw);
  grid-auto-rows: minmax(50px, auto);
  grid-auto-flow: dense;
  margintop: 30px;
`;

export const ImageItem = styled.div`
  /* Adapt the colors based on sizeText prop */
  grid-column: ${(props) =>
    props.sizeText === "landscape" ? "auto / span 2" : ""};
  grid-row: ${(props) =>
    props.sizeText === "portrait" ? "auto / span 2" : ""};
`;

export const Image = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
