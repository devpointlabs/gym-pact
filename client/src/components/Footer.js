import React from "react";

const Footer = () => {
  return <div style={styles.footer}></div>;
};

export default Footer;

const styles = {
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyConent: "center",
    backgroundColor: "#292A4C",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    // backgroundColor: "black",
    // color: "white",
    textAlign: "center",
    height: "0em",
    marginTop: "-8em",
  },
};
