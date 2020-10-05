import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
function Header() {
  return (
    <Navbar color="primary" dark className="mb-4">
      <NavbarBrand href="/">Movie List</NavbarBrand>
    </Navbar>
  );
}
export default Header;
