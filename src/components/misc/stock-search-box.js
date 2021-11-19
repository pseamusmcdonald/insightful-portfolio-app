import React, { useState, useEffect, useRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { map } from '@firebase/util';

const indexName = "stocks"
const searchClient = algoliasearch('PTF9RQ5FII', 'fe034958ba0199935cf36f1e36ff2770');
const index = searchClient.initIndex(indexName);

const StockSearchBox = () => {
	
	const [ query, setQuery ] = useState()
	const [ results, setResults ] = useState([])
	const [ selected, setSelected ] = useState(false)

	const stockSearchInput = useRef(null)

	const fetchStocks = async () => {
		await index.search(query)
			.then(data => {
				setResults(data.hits.slice(0, 5))
			})
	}

	const handleInputChange = () => {
		setQuery(stockSearchInput.current.value)
	}

	useEffect(() => {
		fetchStocks()
	}, [query])


	return (
		<>
		<input name="company" onChange={(event) => {
			handleInputChange(event)
			setSelected(false)
		}} ref={stockSearchInput} required/>
		{(results.length > 0 && query) ?
			<ul className="hitsContainer">
				{results.map((result, i) => (
					<li className="hit" key={i} data-cik-id={result.objectID} data-stock-ticker={`${result.exchange === "XNYS" ? "NYSE" : "NASDAQ"}: ${result.ticker}`} onClick={(event) => {
						setQuery(event.target.getAttribute('data-stock-ticker'))
						setSelected(true)
						stockSearchInput.current.value = event.target.getAttribute('data-stock-ticker')
					}}>{result.name}</li>
				))}
			</ul>
			:
			(results.length === 0 && query && !selected) &&
			<ul className="hitsContainer">
				<div>No stocks found</div>
			</ul>
		}
		</>
	)
}

export default StockSearchBox