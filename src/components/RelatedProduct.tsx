import { Product } from "../interfaces";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
interface relatedProductProps {
  product: Product;
}

const RelatedProduct = ({ product }: relatedProductProps) => {
  return (
    <Link
      to={`/products/${product.id}`}
      style={{ width: "10em", color: "black", textDecoration: "none" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Paper sx={{p: 2}}>
        <img
          src={product.image}
          alt="product"
          style={{ width: "100%", height: "auto" }}
        />

        <Typography variant="body1" component="div">
          {product.title  }
        </Typography>
        <Typography variant="h6" component="div">
          {product.price} $
        </Typography>
      </Paper>
    </Link>
  );
}
export default RelatedProduct;