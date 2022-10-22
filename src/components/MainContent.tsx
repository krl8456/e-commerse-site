import React from "react";
import Box from "@mui/material/Box";


const MainContent = ({ children }: { children: React.ReactNode }) => {
  return <Box sx={{ mt: "5em" }}>{children}</Box>;
}

export default MainContent;
