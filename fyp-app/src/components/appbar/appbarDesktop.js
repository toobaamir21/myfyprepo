import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {AppbarContainer, AppbarHeader, MyList } from "../../styles/appbar";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions";
export default function AppbarDesktop({matches}){
   
    return(
        <AppbarContainer>
        <AppbarHeader>Artisan Craft Hub</AppbarHeader>
        <MyList type = "row">
            <ListItemText primary= "Home"/>
            <ListItemText primary= "AboutUs"/>
            <ListItemText primary= "Contact"/>
            <ListItemText primary= "Products"/>
            <ListItemButton>
            <ListItemIcon>
                <SearchIcon/>
            </ListItemIcon>
        </ListItemButton>
        </MyList>
        <Actions matches={matches}/>
       </AppbarContainer>
    )
}
