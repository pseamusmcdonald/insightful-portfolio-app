const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const functions = require('firebase-functions');
const fetch = require('node-fetch')
require("firebase-functions/lib/logger/compat");


exports.refreshStockTickers = functions.runWith({
	timeoutSeconds: 300,
	memory: "1GB",
	}).pubsub.schedule('every 24 hours')
	.onRun(async(context) => {

		const exchanges = ["XNAS", "XNYS"]
	
		let stocks = []
	
		let fetchPromises = []

		let setPromises =[]
	
		const fetchDataRecursively = async (nextUrl) => {
			const fetchUrl = nextUrl + "&apiKey=GcZjRTE0ioMDWilYakYRr7mZDOm1DIZc"
			let tempUrl
			await fetch(fetchUrl)
				.then(res => res.json())
				.then((data) => {
					stocks.push(...data.results)
					tempUrl = data.next_url
				})
				.catch((err) => {
					console.log(err)
				})
			if (tempUrl !== undefined) {
				await fetchDataRecursively(tempUrl)
			}
		}  
	
		const fetchData = async (exchange) => {

			let promise
			
			await fetch(`https://api.polygon.io/v3/reference/tickers?exchange=${exchange}&active=true&sort=ticker&order=asc&limit=100000&apiKey=GcZjRTE0ioMDWilYakYRr7mZDOm1DIZc`)
				.then(res => res.json())
				.then((data) => {
					stocks.push(...data.results)
					if (data.next_url !== undefined) {
						promise = fetchDataRecursively(data.next_url)
					}
				})
				.catch((err) => {
					console.log(err)
				})
	
			await promise.then(() => {
				return
			})
		}
	
		for (exchange of exchanges) {
			fetchPromises.push(fetchData(exchange))
		}

		await Promise.all(fetchPromises).then(() => {
			stocks.forEach((stock) => {
				if (stock.cik !== undefined) {
					setPromises.push(
						db.collection("stocks").doc(`${stock.cik}`).set({
							name: stock.name,
							ticker: stock.ticker,
							cik: stock.cik,
							exchange: stock.primary_exchange,
						})
						.then(() => {
							console.log("stock recorded")
						})
					)
				}
			})
		})

		await Promise.all(setPromises)

		return null
})