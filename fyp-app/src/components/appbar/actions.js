// import {Divider, ListItemButton, ListItemIcon } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { Colors } from "../../styles/theme";
// import {ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from "../../styles/appbar";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { clearLength } from "../../features/checkout/CartSlice";

// export default function Actions({matches}) {
//   const Component = matches
//   ?  ActionIconsContainerMobile:
//      ActionIconsContainerDesktop
//      const { length } = useSelector((state) => state.cart);
//      const { user } = useSelector((state) => state.user);
//      const dispatch = useDispatch()
//      const handleClear=()=>{
//        dispatch(clearLength())
//      }
//     return (
//       <Component>
//         <MyList type="row">
//           <Link to={"/cart"}>
//             <ListItemButton
//               sx={{
//                 justifyContent: "center",
//               }}
//               onClick={handleClear}
//             >
//               <ListItemIcon
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   color: matches && Colors.secondary,
//                 }}
//               >
//                 <ShoppingCartIcon />
//                 {length > 0 ? (
//                   <span
//                     style={{
//                       position: "absolute",
//                       bottom: "2vw",
//                       right: "8px",
//                       background: "red",
//                       color: "white",
//                       padding: "4px 8px",
//                       borderRadius: "50%",
//                       fontSize: "12px",
//                       fontWeight: "bold",
//                       marginRight: "1vw",
//                     }}
//                   >
//                     {length}
//                   </span>
//                 ) : (
//                   ""
//                 )}
//               </ListItemIcon>
//             </ListItemButton>
//           </Link>
//           <Divider orientation="vertical" flexItem />
//           <ListItemButton
//             sx={{
//               justifyContent: "center",
//             }}
//           >
//             <ListItemIcon
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 color: matches && Colors.secondary,
//               }}
//             >
//               <FavoriteIcon />
//             </ListItemIcon>
//           </ListItemButton>
//           <Divider orientation="vertical" flexItem />
//           <Link to={"/login"} style={{ textDecoration: "none" }}>
//             <ListItemButton
//               sx={{
//                 justifyContent: "center",
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   color: matches && Colors.secondary,
//                 }}
//               >
//                 <PersonIcon />
//                 {user ? user.fullname.split(" ")[0] : "Login"}
//               </ListItemIcon>
//             </ListItemButton>
//           </Link>
//           <Divider orientation="vertical" flexItem />
//         </MyList>
//       </Component>
//     );
//     }

import React, { useState } from "react";
import { Dialog, ListItem, ListItemText, List, Divider, ListItemIcon, ListItemButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Colors } from "../../styles/theme";
import {
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
  MyList,
} from "../../styles/appbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearLength } from "../../features/checkout/CartSlice";
import { clearUser } from "../../features/users/UserSlice";

export default function Actions({ matches }) {
  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;
  const { length } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()

  const handleClear = () => {
    dispatch(clearLength());
  };

    const handlePersonIconClick = () => {
      if (user) {
        setOpenModal(true);
      } else {
        navigate("/login");
      }
    };



  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
      localStorage.removeItem("userInfo");
     dispatch(clearUser())
      navigate("/login")
    handleModalClose();
  };

  return (
    <>
      <Component>
        <MyList type="row">
          <Link to={"/cart"}>
            <ListItemButton
              sx={{
                justifyContent: "center",
              }}
              onClick={handleClear}
            >
              <ListItemIcon
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: matches && Colors.secondary,
                }}
              >
                <ShoppingCartIcon />
                {length > 0 ? (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "2vw",
                      right: "8px",
                      background: "red",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "50%",
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginRight: "1vw",
                    }}
                  >
                    {length}
                  </span>
                ) : (
                  ""
                )}
              </ListItemIcon>
            </ListItemButton>
          </Link>
          <Divider orientation="vertical" flexItem />
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                color: matches && Colors.secondary,
              }}
            >
              <FavoriteIcon />
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation="vertical" flexItem />
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
            onClick={handlePersonIconClick}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                color: matches && Colors.secondary,
              }}
            >
              <PersonIcon />
              {user
                ? user.fullname
                  ? user.fullname.split(" ")[0]
                  : "Login"
                : "Login"}
            </ListItemIcon>
          </ListItemButton>
          <Divider orientation="vertical" flexItem />
        </MyList>
      </Component>
      <Dialog open={openModal} onClose={handleModalClose}>
        <List>
          {/* My Profile */}
          <ListItem>
            <ListItemText primary="My Profile" />
          </ListItem>
          {/* Logout */}
          <ListItem onClick={handleLogout} style={{ cursor: "pointer" }}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}
