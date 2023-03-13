//<!-- <Cart/>
//<Products/> -->




import Products from "./Products/index"
import Categories from "./Categories";
import Cart from "./Cart";


function Shopping(props) {

    return (<>
        <Cart></Cart>
        {/* <Categories></Categories> */}
        <Products></Products>
    </>
    )
}
export default Shopping