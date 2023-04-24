import { Box, Button, Typography } from "@mui/material"
import { addItemCart, subtractItemCart } from "../api/fetchCart";
import { useAppDispatch } from "../util/hooks";
import { actions as userActions } from "../features/userReduser";

interface Props {
  itemId: number,
  totalPrice: number,
  elementQty: string | number
}

const CartButton: React.FC<Props> = ({ itemId, totalPrice, elementQty }) => {
  const dispatch = useAppDispatch();

  const onSubtractionHandler = async () => {
    try {
      const shoppingCartFromServer = await subtractItemCart(itemId);
      dispatch(userActions.setShoppingCart(shoppingCartFromServer))
    } catch (error) {
      throw new Error(`error:${error}`)
    }
  }

  const onAddHandler = async () => {
    try {
      const shoppingCartFromServer = await addItemCart(itemId);
      dispatch(userActions.setShoppingCart(shoppingCartFromServer))
    } catch (error) {
      throw new Error(`error:${error}`)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
      <Box>
        <Typography variant="body1" sx={{ padding: '14px 20px', marginRight: '32px' }}>{totalPrice} грн</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center', alighItems: 'center' }}>
        <Button variant="outlined" onClick={onSubtractionHandler}>
          <Typography variant="body1" sx={{ padding: '16px 20px' }}>
            -
          </Typography>
        </Button>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alighItems: 'center',
            textAlign: 'center',
            background: 'rgba(203, 60, 46, 0.1)',
            borderRadius: '12px',
            width: '195px'
          }}>
          <Typography variant="body1" sx={{ padding: '24px 43px' }}>{isNaN(totalPrice) ? '0 грн' : `${elementQty}`}</Typography>
        </Box>
        <Button variant="outlined" onClick={onAddHandler}>
          <Typography variant="body1" sx={{ padding: '16px 20px' }}>
            +
          </Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default CartButton