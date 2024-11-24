/** @format */
import Link from "next/link";
import React from "react";

const Cancel = () => {
  return (
    <div>
      <h3>Error ! something went wrong during the payment</h3>
      <Link href={"/"}>Click here to get back to the home page</Link>
    </div>
  );
};

export default Cancel;
