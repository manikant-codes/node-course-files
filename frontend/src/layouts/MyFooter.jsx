import { Footer } from "flowbite-react";
import React from "react";
import { COMPANY_NAME } from "../consts";

function MyFooter() {
  return (
    <Footer container className="border-t border-t-gray-200 px-8">
      <div className="flex items-center justify-between w-full">
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
        <Footer.Copyright href="#" by={COMPANY_NAME} year={2024} />
      </div>
    </Footer>
  );
}

export default MyFooter;
