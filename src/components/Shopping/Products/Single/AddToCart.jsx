


function AddToCart({ product }) {

    const changeStorege = () => {
        let cart = localStorage.getItem("cart")
        console.log(cart)
        if (cart == null)
            localStorage.setItem("cart", JSON.stringify([product]));
        else {
            cart = JSON.parse(cart)
            cart = [...cart, product] 
            localStorage.setItem("cart", JSON.stringify(cart));}
        }
        
    

    return <button onClick={changeStorege}>הוספה לעגלה</button>

}

export default AddToCart