import React from "react";
import { Footer } from "flowbite-react";
import { COMPANY_NAME } from "../../consts";

function FooterAdmin() {
  return (
    <Footer container bgDark className="rounded-none">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="/"
            src="logo.svg"
            alt={`${COMPANY_NAME} Logo`}
            name={COMPANY_NAME}
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Copyright
          href="#"
          by={`${COMPANY_NAME}™`}
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
}

export default FooterAdmin;
