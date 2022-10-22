import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const { currentUser } = useAuth();
  return (
    <>
      <Container sx={{ minHeight: "75vh", textAlign: "center", display: "flex", flexDirection: "column", gap: "1.5em" }}>
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
      </Container>
    </>
  );
}

export default Dashboard;
