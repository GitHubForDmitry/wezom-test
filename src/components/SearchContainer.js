import React from "react";
import { connect } from "react-redux";
import {getProductsCollection} from "../store/cardSelectors";
import Search from "./Search";

const SearchContainer = ({ handleSearch, searchValue }) => {

    return (
        <Search handleSearch={ handleSearch} searchValue={searchValue} />
    );
}

const makeMapStateToProps = (state) => {
    const getCards = getProductsCollection(state);
    const mapStateToProps = (state) => (getCards(state));
    return mapStateToProps;
}

const mapStateToProps = state => ({
    cards: makeMapStateToProps(state.cards.items),
    loading: state.cards.loading,
    error: state.cards.error
});

export default connect(mapStateToProps, null)(SearchContainer);