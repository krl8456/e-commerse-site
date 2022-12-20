import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ProductsContainerProps {
  children: React.ReactNode;
  title: string;
}

const ProductsContainer = ({ children, title }: ProductsContainerProps) => {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  return (
    <>
      <Typography
        variant="h1"
        component="h3"
        sx={{
          ml: mediaBreakpoint ? "32%" : 0,
          mb: "0.4em",
          mt: mediaBreakpoint ? "0" : "2em",
          fontFamily: "Qwitcher Grypen",
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
      <Grid
        container
        spacing={mediaBreakpoint ? 4 : 0}
        my={4}
        sx={{
          width: mediaBreakpoint ? "70%" : "100%",
          ml: "auto",
          mt: mediaBreakpoint ? 0 : 15,
        }}
      >
        {children}
      </Grid>
    </>
  );
};

export default ProductsContainer;
