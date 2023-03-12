//<!-- <Cart/>
//<Products/> -->

//import fetches from "../../fetchers"
function Shopping(props){
    const getAllProducts=async()=>{
        const res = await fetch('http://localhost:9660/products')
         console.log(await res.json()) 
    }
    const products = getAllProducts()
    return (<>
        <h6>come to my shoppppppppppppppppppp!!!!!!!!!!!!!a</h6>
        {
            products.map(p=><div>p.id</div>)
        }
        </>
    )
}
export default Shopping;