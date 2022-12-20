import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const { currentUser } = useAuth();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5em",
          alignItems: "center",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
          maxWidth: "400px",
          mx: "auto",
          pb: "4em",
          mt: "6em",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{ mt: mediaBreakpoint ? "1.5em" : "2em" }}
        >
          Profile
        </Typography>
        <Typography variant="body1" component="p">
          <strong>email: </strong>
          {currentUser.email}
        </Typography>
        <Link to="/update-profile" style={{textDecoration: "none", color: "black"}}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "15em", mt: "3em" }}
          >
            Update your profile
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Dashboard;
