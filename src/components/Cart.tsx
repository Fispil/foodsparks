import { Box, Typography, Stack, Grid, IconButton, Divider } from "@mui/material"
import CartButton from "./СartButton";
import { useEffect } from "react";
import { getitemsCart, removeItemCart, deleteAllItemsCart } from "../api/fetchCart";
import { useAppSelector, useAppDispatch } from "../util/hooks";
import { actions as userActions } from '../features/userReduser';
import DeleteIcon from '../assets/deleteicon.svg';

const Cart: React.FC = () => {
  const isLoggined = useAppSelector(state => state.user.isLoggined);
  const userShoppingCart = useAppSelector(state => state.user.userShoppingCart);
  const dispatch = useAppDispatch();

  const loadCartFromServer = async () => {
    if (isLoggined) {
      try {
        const userCartFromServer = await getitemsCart();

        dispatch(userActions.setShoppingCart(userCartFromServer));
      } catch (error) {
        throw new Error(`Cant load cart: ${error}`);
      }
    }
  }

  const handleClickDeleteItem = async (productId: number) => {
    try {
      const userCartFromServer = await removeItemCart(productId);
      dispatch(userActions.setShoppingCart(userCartFromServer));
    } catch (error) {
      throw new Error(`Cant load cart: ${error}`);
    }
  }

  const handleClearShoppingCart = async () => {
    try {
      const userCartFromServer = await deleteAllItemsCart();
      dispatch(userActions.setShoppingCart(userCartFromServer));
    } catch (error) {
      throw new Error(`Cant load cart: ${error}`);
    }
  }

  useEffect(() => {
    loadCartFromServer();
  }, [isLoggined])

  return (
    <Box sx={{ marginBottom: '72px' }}>
      {userShoppingCart.productAmount.length === 0 ?
        (<Typography variant="body1" sx={{ marginBottom: '72px' }}>Ваш кошик пустий</Typography>)
        : (<Stack>
          {userShoppingCart.productAmount.map(item => (
            <Box key={item.productId} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderRadius: '12px' }}>
              <Box>
                <img src={item.imageUrl} alt='Product picture' />
              </Box>
              <Typography variant="body1">
                {item.name}
              </Typography>
              <Box sx={{ marginRight: '32px' }}>
                <CartButton
                  itemId={item.productId}
                  totalPrice={item.productSum}
                  elementQty={item.quantityInPackages}
                />
              </Box>
              <IconButton
                aria-label="Delete item from cart"
                onClick={() => handleClickDeleteItem(item.productId)}
                edge="end"
              >
                <img src={DeleteIcon} alt='delete icon' />
              </IconButton>
            </Box>
          ))}
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
            <Typography variant='body1'>
              Всього
            </Typography>
            <Typography variant='body1'>
              {userShoppingCart.sum}грн
            </Typography>
          </Box>
        </Stack>
        )
      }
    </Box>
  )
}

export default Cart