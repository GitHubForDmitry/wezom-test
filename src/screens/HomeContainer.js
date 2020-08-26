import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import { fetchCards } from "../store/cardActions";
import Home from "./Home";

const  HomeContainer  = () => {

    const dispatch = useDispatch()
    const data = useSelector(data => data.cards);
    React.useEffect(() => {
        dispatch(fetchCards())}, [])

    const { items, loading, error } = data;

    return (
        <Home items={items} loading={loading} error={error}/>
    );
}

const mapStateToProps = state => ({
    cards: state.cards.items,
    loading: state.cards.loading,
    error: state.cards.error
});

export default connect(mapStateToProps)(HomeContainer);