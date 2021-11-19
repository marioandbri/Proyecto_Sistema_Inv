import React from "react";
import { useFetchProductsApi } from "../useFetchProductsApi";
import PropTypes from "prop-types";

const ProductCard = ({ description, marca, modelo, familia, partnumber }) => {
  // console.log(partnumber);
  const { loading, data } = useFetchProductsApi(partnumber);
  // console.log(loading, data, "useFetch api");
  // console.log(Boolean(data));
  const imageUrl =
    (data && data.results[0]?.picture_url) ||
    "https://bulma.io/images/placeholders/96x96.png";
  // console.log(imageUrl);
  const productname = `${modelo}` || (data && data.results[0]?.name);
  // console.log(loading, "loading status");
  return (
    <>
      <div className="card">
        {/* <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder image"
            ></img>
          </figure>
        </div> */}
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              {loading ? (
                <div
                  style={{ width: "64px", height: "64px" }}
                  className="button is-info is-loading is-outlined"
                ></div>
              ) : (
                <figure className="image is-64x64">
                  <img src={imageUrl} alt="Placeholder image"></img>
                </figure>
              )}
            </div>
            <div className="media-content is-align-self-center">
              <p className="title is-4">{productname}</p>
              <p className="subtitle is-6">
                {familia} {marca}
              </p>
            </div>
          </div>

          <div className="content is-size-7 ">
            {description}
            {/* <br /> */}
            {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
          </div>
        </div>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  description: PropTypes.string,
  marca: PropTypes.string,
  modelo: PropTypes.string,
  familia: PropTypes.string,
  partnumber: PropTypes.string,
};

export default ProductCard;
