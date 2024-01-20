import { useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { BannerContainer, BannerContent, BannerImage, BannerTitle,BannerDescription } from "../../styles/banner"
import Appbar from "../appbar"
export default function Banner(){
    const theme= useTheme()
    const matches= useMediaQuery(theme.breakpoints.down('md'))
    return (
      <>
   
        <BannerContainer>
          <BannerImage src="/images/banner/banner1.jpg"></BannerImage>
          <BannerContent typography ariant="h6">
            Huge Collection
            <BannerTitle variant="h2">Crafted Items</BannerTitle>
            <BannerDescription variant="subtitle">
              Torem ipsum dolor sit amet, consectetur adipisicing elitsed do
              eiusmo tempor incididunt ut labore et dolore magna
            </BannerDescription>
          </BannerContent>
        </BannerContainer>
      </>
    );
}

