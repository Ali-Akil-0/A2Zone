import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, Navigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";

const Header = () => {
  const [{ basket }, dispatch] = useStateValue();

  const AmazonLogoUrl =
    "https://www.seekpng.com/png/full/18-181177_amazon-logo-png-magnetic-rinse-cup-with-toothbrush.png";
  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={AmazonLogoUrl} alt="AmazoneImage" />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" placeholder="" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to="/login">
          <div className="header__option">
            <span className="header__optionLineOne">Hello Guest</span>
            <span className="header__optionLineTwo">Sign in </span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Returns </span>
          <span className="header__optionLineTwo">& Orders </span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your </span>
          <span className="header__optionLineTwo">Prime </span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span classname="header__optionLineTwo header__basketCount ">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
