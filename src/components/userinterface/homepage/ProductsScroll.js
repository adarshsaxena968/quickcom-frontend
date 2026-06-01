import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import PlusMinusButton from "./PlusMinusButton";
import { useNavigate } from "react-router-dom";

export default function ProductsScroll({ refresh, setRefresh, title, data }) {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const md_matches = useMediaQuery(theme.breakpoints.up("md"));
  const lg_matches = useMediaQuery(theme.breakpoints.up("lg"));

  const cartData = useSelector((state) => state?.cart);
  const keys = Object.keys(cartData);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: lg_matches ? 6 : md_matches ? 4 : matches ? 3 : 2,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleChange = (value, item) => {
    if (value === 0) {
      dispatch({ type: "DELETE_CART", payload: [item.productdetailid] });
    } else {
      item["qty"] = value;
      dispatch({ type: "ADD_CART", payload: [item.productdetailid, item] });
    }
    setRefresh(!refresh);
  };

  const handleNavigateProductDetail = (item) => {
    navigate("/productdetailspage", { state: { product: item } });
  };

  const showImages = () => {
    return data.map((item, index) => {
      const discountPercent = item.offerprice > 0
        ? parseInt(((item.price - item.offerprice) / item.price) * 100)
        : 0;

      const inCart = keys.includes(item?.productdetailid);
      const qty = inCart ? cartData[item.productdetailid]?.qty : 0;

      return (
        <div key={index} style={{ padding: "0 12px" }}>
          <div
            style={{
              border: "1px solid #e8e8e8",
              borderRadius: 16,
              // gap: 8,
              backgroundColor: "#fff",
              overflow: "hidden",
              display: "flex",
              gap: 8,
              width: "100%",
              flexDirection: "column",
              height: "100%",
              transition: "box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            {/* Image Area */}
            <div
              onClick={() => handleNavigateProductDetail(item)}
              style={{
                backgroundColor: "#f8f9fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 150,
                padding: 12,
                position: "relative",
              }}
            >
              {discountPercent > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    backgroundColor: "#03753c",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 7px",
                    borderRadius: 6,
                    letterSpacing: 0.3,
                  }}
                >
                  {discountPercent}% OFF
                </div>
              )}
              <img
                src={`${serverURL}/images/${item.picture}`}
                alt={item.productdetailname}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Info Area */}
            <div style={{ padding: "10px 12px 0 12px", flex: 1 }}>
              {/* Product Name */}
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#1a1a1a",
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: 36,
                  marginBottom: 4,
                }}
              >
                {item.productdetailname}
              </div>

              {/* Weight */}
              <div
                style={{
                  fontSize: 12,
                  color: "#888",
                  fontWeight: 500,
                  marginBottom: 8,
                }}
              >
                {item.weight} {item.weighttype}
              </div>

              {/* Price Section */}
              {item.offerprice > 0 ? (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>
                    ₹{item.offerprice}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <s style={{ fontSize: 12, color: "#aaa" }}>₹{item.price}</s>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#03753c",
                        backgroundColor: "#e5f7ee",
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                    >
                      {discountPercent}% OFF
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>
                    ₹{item.price}
                  </div>
                  <div style={{ height: 18 }} />
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <div style={{ padding: "0 12px 12px 12px" }}>
              <PlusMinusButton
                qty={qty}
                onChange={(value) => handleChange(value, item)}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  const handleNext = () => scrollRef.current.slickNext();
  const handlePrev = () => scrollRef.current.slickPrev();

  return (
    <div style={{ marginBottom: 8 }}>
      {/* Section Title */}
      <div
        style={{
          fontWeight: 800,
          fontSize: 22,
          color: "#141414",
          letterSpacing: -0.5,
          marginBottom: 14,
          textTransform: "capitalize",
        }}
      >
        {title}
      </div>

      {/* Slider Container */}
      <div style={{ position: "relative" }}>
        {/* Left Arrow */}
        {matches && (
          <button
            onClick={handlePrev}
            style={{
              position: "absolute",
              top: "50%",
              left: -16,
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "#fff",
              border: "1.5px solid #e0e0e0",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              padding: 0,
            }}
          >
            <KeyboardArrowLeftIcon style={{ color: "#333", fontSize: 22 }} />
          </button>
        )}

        <Slider ref={scrollRef} {...settings}>
          {showImages()}
        </Slider>

        {/* Right Arrow */}
        {matches && (
          <button
            onClick={handleNext}
            style={{
              position: "absolute",
              top: "50%",
              right: -16,
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "#fff",
              border: "1.5px solid #e0e0e0",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              padding: 0,
            }}
          >
            <KeyboardArrowRightIcon style={{ color: "#333", fontSize: 22 }} />
          </button>
        )}
      </div>
    </div>
  );
}