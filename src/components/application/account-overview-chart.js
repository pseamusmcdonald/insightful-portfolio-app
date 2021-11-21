import React, { useState, useEffect } from 'react'
import { httpsCallable } from '@firebase/functions'
import { functions } from '../misc/firebase'

import StockChart from '../misc/stock-chart'
import Loading from '../misc/loading'

const AccountOverviewChart = ({positions}) => {
	

	const [ data, setData ] = useState(null)
    const [ labels, setLabels ] = useState(null)

	const getChartData = httpsCallable(functions, 'getStockChartData')

	const tickers = []

	let portfolioCost = 0
	for (const pos of positions) {
		portfolioCost += (pos.shares * pos.cost)		
	}

	positions.forEach(pos => {
		const tickerArray = pos.company.split(" ")
		const tickerPlain = tickerArray[1]
		tickers.push({
			name: tickerPlain,
			quantity: pos.shares,
		})
	})

	
	useEffect(async () => {
			const chartDataPromise = await getChartData({ tickers: tickers })
			const chartData = await JSON.parse(chartDataPromise.data.body)
			setData(chartData)
	}, [positions])

	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	const yyyy = today.getFullYear();

	const todayFormatted = mm + '-' + dd + '-' + yyyy;

	const handleChartRangeSelection = (event) => {
        setLabels(null)
    }

	return (
		<div className='accountOverviewChart'>
			<select id='chartPeriodSelection' onChange={handleChartRangeSelection}>
				<option value='daily'>1 Day</option>
				{/* 
				 // UNDER DEV
				<option value='weekly'>5 Day</option>
				<option value='monthly'>1 Month</option>
				<option value='yearly'>1 Year</option>
				<option value='ytd'>YTD</option> */}
			</select>
			{data === null &&
				<Loading />
			}
			<StockChart data={data} labels={labels} positive={true}/>
		</div>
	)
}

export default AccountOverviewChart