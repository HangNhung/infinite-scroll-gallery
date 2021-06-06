import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const UnsplashImage = ({ url, key, sizeText }) => (
  <div className={`image-item ${sizeText}`} key={key}>
    <img src={url} alt="hbnhung" />
  </div>
);

export let Collage = () => {
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = "KwBdJK7CXpzN-HvCWU52SEDa45t8bBe2G-mECBYsc-A";

    axios
      .get(`${apiRoot}/photos?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        console.log("res", res);
        setImages([...images, ...res.data]);
        setIsLoaded(true);
      });
  };

  React.useEffect(() => {
    fetchImages();
  }, []); // eslint-disable-line

  return (
    <div className="hero is-fullheight is-bold is-info">
      <div className="hero-body">
        <div className="container">
          <div className="header content">
            <h1 className="title is-1">
              Infinite Scroll Unsplash Code Challenge
            </h1>
          </div>
          <InfiniteScroll
            dataLength={images}
            next={() => fetchImages(20)}
            hasMore={true}
            loader={
              <img src={require("../src/sand-clock.png")} alt="loading" />
            }
          >
            <div className="image-grid" style={{ marginTop: "30xp" }}>
              {loaded
                ? images.map((image, index) => (
                    <UnsplashImage
                      key={index}
                      url={image.urls.regular}
                      sizeText={`${
                        image.width / image.height > 1
                          ? "landscape"
                          : "portrait"
                      }`}
                    />
                  ))
                : ""}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};
