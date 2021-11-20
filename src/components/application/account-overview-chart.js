import React, { useState, useEffect } from 'react'
import { httpsCallable } from '@firebase/functions'
import { functions } from '../misc/firebase'

import LineChart from '../misc/line_chart'

const AccountOverviewChart = ({positions}) => {
	

	const [ data, setData ] = useState(null)
    const [ labels, setLabels ] = useState(null)

	const getChartData = httpsCallable(functions, 'getStockChartData')

	const tickers = []

	positions.forEach(pos => {
		const tickerArray = pos.company.split(" ")
		const tickerPlain = tickerArray[1]
		tickers.push({
			name: tickerPlain,
			quantity: pos.shares,
		})
	})

	
	useEffect(async () => {
		if (!data) {
			const chartDataPromise = await getChartData({ tickers: tickers })
			const chartData = await JSON.parse(chartDataPromise.data.body)
			setData(chartData)
			console.log(chartData)
		}
	})

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
				<option value='weekly'>5 Day</option>
				<option value='monthly'>1 Month</option>
				<option value='yearly'>1 Year</option>
				<option value='ytd'>YTD</option>
			</select>
			<LineChart data={data} labels={labels}/>
		</div>
	)
}

export default AccountOverviewChart