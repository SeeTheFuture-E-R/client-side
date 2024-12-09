// get getItems1    
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SingleProduct from '../Products/Single';
import Payment from './Payment';
import Details from './Details';



function Cart({ count, setCount }) {

    const [open, setOpen] = React.useState(false);
    const [cartOpen, setCartOpen] = React.useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const getProductsFromStorage = () => {
        let cart = localStorage.getItem("cart")

        if (cart != null) {
            cart = JSON.parse(cart)
            return cart
        }
        return []
    }

    const calcSum = () => {
        let cart = localStorage.getItem("cart")
        if (cart != null) {
            cart = JSON.parse(cart)
            let sum = 0
            cart.forEach(e => {
                sum += parseInt(e.price);
                
            });
            return sum

        }
        return 0
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (

        <div>
            <IconButton aria-label="cart" variant="outlined" onClick={handleClickOpen}>
                <StyledBadge badgeContent={count} color="secondary" >
                    <ShoppingCartIcon fontSize="large" />
                </StyledBadge>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{ width: 500 }}>
                    {cartOpen ?
                        <Details setCartOpen={setCartOpen} handleClose={handleClose} calcSum={calcSum()} setCount={setCount}></Details>
                        :
                        <Payment setCartOpen={setCartOpen} handleClose={handleClose} calcSum={calcSum()} setCount={setCount}></Payment>
                    }
                </div>
            </Dialog>
        </div>
    );
}

export default Cart