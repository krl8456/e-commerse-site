import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

interface CategoriesProps {
  categories: Array<string>;
  searchByCategory(category: string): void;
}

export default function Categories({
  categories,
  searchByCategory,
}: CategoriesProps) {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  if (!mediaBreakpoint) return null;
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        position: "absolute",
        top: 160,
        ml: 2,
      }}
    >
      <Typography
        variant="h1"
        component="h2"
        sx={{ fontFamily: "Qwitcher Grypen" }}
      >
        Categories
      </Typography>
      <List>
        <ListItem disablePadding onClick={() => searchByCategory("")}>
          <ListItemButton>
            <ListItemText primary="All" />
          </ListItemButton>
        </ListItem>
        {categories.map((el) => (
          <ListItem disablePadding onClick={() => searchByCategory(el)}>
            <ListItemButton>
              <ListItemText
                primary={el.charAt(0).toUpperCase() + el.slice(1)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
