import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const indexName = "stocks"

const searchClient = algoliasearch('PTF9RQ5FII', 'fe034958ba0199935cf36f1e36ff2770');

const StockSearchBox = () => (
  <InstantSearch
    indexName={indexName}
    searchClient={searchClient}
  >
    <SearchBox />
    <Hits />
  </InstantSearch>
)

export default StockSearchBox