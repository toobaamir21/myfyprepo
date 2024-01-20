import { IconButton, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {AppbarContainer, AppbarHeader, MyList } from "../../styles/appbar";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions";
import { useEffect, useState } from "react";
import { searchProduct } from "../../features/product/ProdSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function AppbarDesktop({matches}){
   const [searchData, setSearchData] = useState("");
   const dispatch = useDispatch()
   const navigate = useNavigate()
   
   const handleSearch = (searchData) => {
     if (searchData.trim() === "") {
       // If search is empty, navigate to the category page
       navigate("/");
     } else {
       // If search is not empty, navigate to the products page with the search query
       navigate(`/products?productName=${searchData}`);
     }
   };

    return (
      <AppbarContainer>
        <AppbarHeader>Artistry</AppbarHeader>
        <MyList type="row">
          <ListItemText primary="Home" />
          <ListItemText primary="AboutUs" />
          <ListItemText primary="Contact" />
          <ListItemButton>
            <ListItemIcon>
              <form className="d-flex" role="search">
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                  style={{ padding: ".6vw" }}
                />
              </form>
              <IconButton
                onClick={() => handleSearch(searchData)}
                style={{ padding: ".6vw" }}
              >
                <SearchIcon />
              </IconButton>
            </ListItemIcon>
          </ListItemButton>
        </MyList>
        <Actions matches={matches} />
      </AppbarContainer>
    );
}
