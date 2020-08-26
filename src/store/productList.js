import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import { fetchProducts } from "./productActions";

const  ProductList  = () => {

    const dispatch = useDispatch()
    const data = useSelector(data => data.products);
    React.useEffect(() => {
        dispatch(fetchProducts())}, [])


        const { items, loading, error } = data;



        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <ul>
                {items.map((product, index) =>
                    <li key={index}>{product.location.country}</li>
                )}
            </ul>
        );
}

const mapStateToProps = state => ({
    products: state.products.items,
    loading: state.products.loading,
    error: state.products.error
});

export default connect(mapStateToProps)(ProductList);