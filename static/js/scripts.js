
// global
let chartHumTemp; 
let chartEthyl; 
let isPlay = true;
let url = 'http://localhost:80/ruty_api_test/delivery/truck/1/last'; 


//API REQ
async function requestData() {
    if(isPlay == true){
        const result = await fetch(url);
        if (result.ok) {

            const data = await result.json();
            var temp = data.data.temp.data;
            var hum = data.data.hum.data; 
            var entryDate = data.data.temp.date;
            console.log(entryDate+" "+temp+" "+hum);
            const pointTemp = [new Date(entryDate).getTime(), temp];  
            const pointHum = [new Date(entryDate).getTime(), hum];        
            const series = chartHumTemp.series[0],
                shift = series.data.length > 20; // shift if the series is longer than 20
            const seriesH = chartHumTemp.series[1],
                shiftH = seriesH.data.length > 20; // shift if the series is longer than 20
            // add the point
            chartHumTemp.series[0].addPoint(pointTemp, true, shift);
            chartHumTemp.series[1].addPoint(pointHum, true, shiftH);
                    // call it again after one second
        setTimeout(requestData, 1000);
        }
    }
}

async function requestData2() {
    if(isPlay == true){
        const result = await fetch(url);
        if (result.ok) {
            const data = await result.json();
            var ethy = data.data.ethy.data;
            var entryDate = data.data.temp.date;

            const pointEthy = [new Date(entryDate).getTime(), ethy];       

            const seriesE = chartEthyl.series[0],
                shift = seriesE.data.length > 20; // shift if the series is longer than 20
            // add the point
            chartEthyl.series[0].addPoint(pointEthy, true, shift);
  
                    // call it again after one second
        setTimeout(requestData, 1000);
        }
    }
}



//grafica lineal
window.addEventListener('load', function () {
    chartHumTemp = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            defaultSeriesType: 'spline',
            events: {
                load: requestData
            }
        },
        title: {
            text: 'temperatura: °C | humedad: %',
            style: {    
                color: 'black',
                fontWeight: 'bold'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000,
            crosshair: true
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}°C',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Temperature in °C',
                style: {
                    //textOutline: 0,
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'rel. humidity in %',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        legend: {
            show: true,
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 50,
            floating: true,
            borderWidth: 2,
            position: 'labeled',
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        tooltip: {
            shared: true
        },
        series: [{
            name: 'Temperatura',
            data: [],
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return Highcharts.numberFormat(this.y,2);
                }
            },
            zones: [{
                value: 10,
                color: '#c42525'
            }, {
                value: 50,
                color: '#f28f43'
            }, {
                color: '#0d233a'
            }],
            color: '#0d233a',
            tooltip: {
                valueSuffix: '°C',
                valueDecimals: 2
                }
            },
            {
            name: 'Humedad',
            data: [],
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return Highcharts.numberFormat(this.y,2);
                }
            },
            dashStyle: "shortDash",
            yAxis: 1,
            color: '#2f7ed8',
            tooltip: {
                valueSuffix: '%',
                valueDecimals: 2
                }
            }
        ]
    });
////////////////////////////////////////////////////ethylene
//grafica lineal
    chartEthyl = new Highcharts.Chart({
        chart: {
            renderTo: 'container-ethy',
            defaultSeriesType: 'spline',
            events: {
                load: requestData2
            }
        },
        title: {
            text: 'Etileno',
            style: {    
                color: 'black',
                fontWeight: 'bold'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000,
            crosshair: true
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Ethylene in %',
                style: {
                    //textOutline: 0,
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }],
        legend: {
            show: true,
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 50,
            floating: true,
            borderWidth: 2,
            position: 'labeled',
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        tooltip: {
            shared: true
        },
        series: [{
            name: 'Etileno',
            data: [],
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return Highcharts.numberFormat(this.y,2);
                }
            },
            dashStyle: "shortDash",
            zones: [{
                value: 10,
                color: '#c42525'
            }, {
                value: 50,
                color: '#f28f43'
            }, {
                color: '#0d233a'
            }],
            color: '#0d233a',
            tooltip: {
                valueSuffix: '%',
                valueDecimals: 2
                }
            }
        ]
    });
});





function play(){
    isPlay = true;
    requestData();
}

function stop(){
    isPlay = false;
}





////////////////////////////////////////////////////map 
//api location MAPA
let myMap = L.map('myMap').setView([0, 0], 2)

const urlOpenLayers = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
L.tileLayer(urlOpenLayers, {
  maxZoom: 15,
}).addTo(myMap)

const iconMarker = L.icon({
  iconUrl: './static/assets/img/mappin.png',
  iconSize: [60, 60],
  iconAnchor: [30, 60]
})

let marker = null
const updateMap = () => {
  const urlISSGeoLocation = 'http://localhost:80/ruty_api_test/delivery/truck/1/last'
  fetch(urlISSGeoLocation)
    .then(res => res.json())
    .then(data => {
      if (marker) {
        myMap.removeLayer(marker)
      }
      const {
        latitude,
        longitude
      } = data.data.temp.coords
      console.log(latitude, longitude)
      marker = L.marker([latitude.toString(), longitude.toString()], {
      //  icon: iconMarker
      }).addTo(myMap);
    })
  setTimeout(updateMap, 3000)
}

function clickZoom(e) {
	map.setView(e.target.getLatLng(),15);
}

updateMap()





 

 
