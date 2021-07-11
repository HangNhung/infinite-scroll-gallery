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
import { storage } from "../config";

const UnsplashImage = ({ url, index, sizeText }) => (
  <ImageItem sizeText={sizeText} key={index}>
    <Image src={url} alt="hbnhung" />
  </ImageItem>
);

let Collage = () => {
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  const fetchImages = async () => {
    const storageRef = storage.ref();
    let result = await storageRef.child("cat").listAll();
    /// map() array of the imageRef.getDownloadURL() promises
    let urlPromises = result.items.map((imageRef) => imageRef.getDownloadURL());

    // return all resolved promises
    return Promise.all(urlPromises).then((images) => {
      setIsLoaded(true);
      setImages(images);
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
      <div>
        <ImageGrid>
          {loaded
            ? images.map((image, index) => (
                <UnsplashImage
                  index={index}
                  url={image}
                  // sizeText={`${
                  //   image.width / image.height > 1 ? "landscape" : "portrait"
                  // }`}
                  sizeText={"landscape"}
                />
              ))
            : ""}
        </ImageGrid>
      </div>
    </Container>
  );
};

export default Collage;
