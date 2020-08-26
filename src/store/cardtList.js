import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import { fetchCards } from "./cardActions";

const  ProductList  = () => {

    const dispatch = useDispatch()
    const data = useSelector(data => data.cards);
    React.useEffect(() => {
        dispatch(fetchCards())}, [])


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
    cards: state.cards.items,
    loading: state.cards.loading,
    error: state.cards.error
});

export default connect(mapStateToProps)(ProductList);