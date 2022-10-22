import { Container } from "@mui/material";

const Site = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      sx={{ bgcolor: "#fff", mt: "2em", borderRadius: 8, pb:4, overflowX: "hidden"}}
      maxWidth={false}
    >
      {children}
    </Container>
  );
};

export default Site;
