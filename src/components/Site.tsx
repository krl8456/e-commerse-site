import { Container } from "@mui/material";

const Site = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      sx={{ bgcolor: "#fff", mt: "2em", borderRadius: 8, pb:4, overflowX: "hidden", minHeight: "calc(100vh - 2em)"}}
      maxWidth={false}
    >
      {children}
    </Container>
  );
};

export default Site;
