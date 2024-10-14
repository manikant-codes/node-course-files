import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { getDiscountedPrice } from "../../../helpers/priceHelper";
import { removeFromCart } from "../../../redux/slices/cartSlice";

function CartItem({ cartItem, index }) {
  console.log(cartItem);
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeFromCart(index));
  }

  return (
    <div>
      <ListItem
        className="px-4 border-b border-b-gray-200"
        disablePadding
        secondaryAction={
          <IconButton onClick={handleDelete} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar src={cartItem.images[0]} />
        </ListItemAvatar>
        <ListItemText
          primary={<span className="ml-[2px]">{cartItem.name}</span>}
          secondary={
            <span className="inline-flex items-center gap-1">
              <IconButton sx={{ padding: 0 }}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <span>
                ₹
                {getDiscountedPrice(
                  cartItem.price,
                  cartItem.discountPercentage
                )}{" "}
                x {cartItem.qty}
              </span>
              <IconButton sx={{ padding: 0 }}>
                <AddCircleOutlineIcon />
              </IconButton>
            </span>
          }
        />
      </ListItem>
    </div>
  );
}

export default CartItem;
