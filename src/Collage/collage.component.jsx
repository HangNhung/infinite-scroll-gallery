import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Container,
  Title,
  ImageGrid,
  ImageItem,
  Image,
  Button,
} from "./collage.styles";
import { Link } from "react-router-dom";

const UnsplashImage = ({ url, index, sizeText }) => (
  <ImageItem sizeText={sizeText} key={index}>
    <Image src={url} alt="hbnhung" />
  </ImageItem>
);

let Collage = () => {
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = "KwBdJK7CXpzN-HvCWU52SEDa45t8bBe2G-mECBYsc-A";

    axios
      .get(`${apiRoot}/photos?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        // console.log("res", res);
        setImages([...images, ...res.data]);
        setIsLoaded(true);
      });
  };

  React.useEffect(() => {
    fetchImages();
  }, []); // eslint-disable-line

  return (
    <Container>
      <div className="header content">
        <Link to="/file-upload">
          <Button>Upload New Images</Button>
        </Link>
        <Title>Infinite Scroll Unsplash Code Challenge</Title>
      </div>
      <InfiniteScroll
        dataLength={images}
        next={() => fetchImages(20)}
        hasMore={true}
        loader={
          null
          // <img src={require("../src/sand-clock.png")} alt="loading" />
        }
      >
        <ImageGrid>
          {loaded
            ? images.map((image, index) => (
                <UnsplashImage
                  index={index}
                  url={image.urls.regular}
                  sizeText={`${
                    image.width / image.height > 1 ? "landscape" : "portrait"
                  }`}
                />
              ))
            : ""}
        </ImageGrid>
      </InfiniteScroll>
    </Container>
  );
};

export default Collage;
