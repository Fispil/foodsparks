import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { addItemCart, removeItemCart, subtractItemCart } from "../api/fetchCart";

interface Props {
  itemId: number,
  elementUnit: string,
  priceItem: number
}

const CartButton: React.FC<Props> = ({ itemId, elementUnit, priceItem}) => {
  const [elementQty, setElementQty] = useState(0);

  const onSubtractionHandler = () => {
    if (elementQty === 0) {
      removeItemCart(itemId);
      return;
    }

    setElementQty((elementQty) => elementQty - 1);
    subtractItemCart(itemId, 1);
  }

  const onAddHandler = () => {
    setElementQty((elementQty) => elementQty + 1);
    addItemCart(itemId, 1);
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
      <Box>
        <Typography variant="body1" sx={{ padding: '14px 20px', marginRight: '84px' }}>{elementQty * priceItem} грн</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center', alighItems: 'center' }}>
        <Button variant="outlined" onClick={onSubtractionHandler}>
          <Typography variant="body1" sx={{ padding: '16px 20px' }}>
            -
          </Typography>
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'center', alighItems: 'center', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ padding: '24px 43px' }}>{isNaN(priceItem) ? '0 грн' : `${elementQty}${elementUnit}`}</Typography>
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