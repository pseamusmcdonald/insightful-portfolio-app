import React, { useEffect, useRef } from 'react'

import { Chart, registerables } from 'chart.js'
import 'chartjs-adapter-date-fns';



Chart.defaults.font.family = 'DM Sans'

const StockChart = ({data, positive}) => {
    
    const chartRef = useRef(null)

    useEffect(() => {

        const chartCtx = chartRef.current.getContext('2d')
            
        const lineChart = new Chart(chartCtx, {
            type: 'line',
            data: {
                datasets: [{
                    label: '',
                    data: data,
                    fill: false,
					borderColor: positive ? '#00AB23': '#F72F3C',
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
						mode: 'index',
						intersect: false,
                        displayColors: false,
                        titleFont: {
                            size: 16,
                        },
                        bodyFont: {
                            size: 14,
                        },
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || ''
        
                                if (label) {
                                    label += ': '
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y)
                                }
                                return label
                            }
                        },
                    },
                },
                tension: .5,
                scales: {
                    y: {
						beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
                            },
                            padding: 10,
							display: false,
                        },
                        grid: {
                            drawBorder: false,
                        },
                    },
                    x: {
						type: 'timeseries',
						adapters: {
							date: {
							}
						},
						time: {
							format: "HH:mm",
							unit: 'minute',
							stepSize: 30,
						},
                        grid: {
                            display: false,
                        },
                    },
                },
				elements: {
					point: {
						radius: 0,
					}
				}
            }
        }) 

        return () => {
            lineChart.destroy()
        }

    })

    Chart.register(...registerables)


    return (
        <canvas id='lineChart' ref={chartRef}/>
    )
}

export default StockChart