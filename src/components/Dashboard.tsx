import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const { currentUser } = useAuth();
  return (
    <>
      <Container
        sx={{
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          gap: "1.5em",
          alignItems: "center",
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
      </Container>
    </>
  );
};

export default Dashboard;
