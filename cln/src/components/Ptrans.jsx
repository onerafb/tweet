import React from "react";
import { motion as m } from "framer-motion";
const Ptrans = () => {
  return (
    <>
      <m.div
        className="slide"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        exit={{ x: ["0%", "100%"], width: ["0%", "100%"] }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <m.div
        className="slide-two"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
      />
      <m.div
        className="slide-three"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
      />
    </>
  );
};

export default Ptrans;
