import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { Product } from "../interfaces";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Grid key={product.id} item xs={12} md={4}>
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: "none", marginLeft: "auto" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Card>
          <CardActionArea disableTouchRipple>
            <CardMedia
              component="img"
              height="160"
              image={product.image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {`${product.title.slice(0, 20)}...`}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {product.category}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 3, my: "auto" }}
                >
                  {product.price} $
                </Typography>

                <Button
                  variant="outlined"
                  color="secondary"
                  endIcon={<ArrowForwardIosIcon />}
                  sx={{ ml: "auto" }}
                >
                  See details
                </Button>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
}

export default ProductCard;
