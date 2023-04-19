import { Box, Button, Popover, Stack, Typography } from "@mui/material";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import React, { useState } from "react";

interface Props {
  order: string,
  onOrderChange: (order: string) => void
}

const SortElementButton: React.FC<Props> = ({ order, onOrderChange }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOrdrerChange = (value: string) => {
    onOrderChange(value);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Button
        variant='text'
        sx={{
          textTransform: 'none',
          color: '#CB3C2E',
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '24px',
          lineHeight: '16px',
          padding: '12px 24px'
        }}
        endIcon={<SyncAltIcon sx={{ rotate: '90deg' }} />}
        onClick={handleOpenPopover}
      >
        Сортувати
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack>
          <Button onClick={() => handleOrdrerChange('')}>
            <Typography variant="body1" sx={{ p: 2, color: '#212529' }}>
              Спочатку популярні
            </Typography>
          </Button>
          <Button>
            <Typography variant="body1" sx={{ p: 2, color: '#212529' }} onClick={() => handleOrdrerChange('cookingTime:ASC')}>
              Час приготування: Від А до Я
            </Typography>
          </Button>
          <Button>
            <Typography variant="body1" sx={{ p: 2, color: '#212529' }} onClick={() => handleOrdrerChange('cookingTime:DESC')}>
              Час приготування: Від А до Я
            </Typography>
          </Button>
          <Button>
            <Typography variant="body1" sx={{ p: 2, color: '#212529' }} onClick={() => handleOrdrerChange('title:ASC')}>
              Від А до Я
            </Typography>
          </Button>
          <Button>
            <Typography variant="body1" sx={{ p: 2, color: '#212529' }} onClick={() => handleOrdrerChange('title:DESC')}>
              Від Я до А
            </Typography>
          </Button>
        </Stack>
      </Popover>
    </Box>
  )
}

export default SortElementButton