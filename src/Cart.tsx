import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));


interface CartProps {
  quantityOfProducts: number;
}


const Cart = ({ quantityOfProducts }: CartProps) => {
  
  return (
    <Box sx={{ mr: 10 }}>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={quantityOfProducts} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    </Box>
  );
};

export default Cart;
