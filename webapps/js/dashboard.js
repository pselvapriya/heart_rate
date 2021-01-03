//piechart
$(()=>{
    var myChart = echarts.init(document.querySelector('#chart'));
  option = {
  backgroundColor: '#ffffff',

  title: {
      text: '',
      left: 'center',
      top: 20,
      textStyle: {
          color: '#ccc'
      }
  },

  tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
  },

  visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
          colorLightness: [0, 1]
      }
  },
  series: [
      {
          name: 'Activity',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
              {value: 335, name: 'Sleeping'},
              {value: 310, name: 'Running'},
              {value: 274, name: 'Reading'},
              {value: 235, name: 'Working'},
              {value: 400, name: 'Eating'}
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
              color: 'rgb(54, 54, 54)'
          },
          labelLine: {
              lineStyle: {
                  color: 'rgb(54, 54, 54)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
          },
          itemStyle: {
             color: '#c23531',
              
              shadowColor: 'rgba(0, 0, 0, 0.5)'
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
              return Math.random() * 200;
          }
      }
  ]
};
myChart.setOption(option);

  var myChart = echarts.init(document.querySelector('#age'));
  option = {
    //   backgroundColor: '#fff',
    title: {
        text: '',
        subtext: '',
        left: 'center'
    },
   
    series: [
        {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '0-20'},
                {value: 310, name: '20-40'},
                {value: 234, name: '40-60'},
                {value: 135, name: '60-80'},
                {value: 1548, name: '80-100'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0
                    // shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

 myChart.setOption(option);

//Barchart

var myChart = echarts.init(document.getElementById('totalpatients'));
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80],
        type: 'bar'
    }]
};
myChart.setOption(option);
});
//linechart
$(()=>{

var myChart = echarts.init(document.querySelector('#heartchart'));
var echartdata = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60],["2000-07-25",44],["2000-07-26",127],["2000-07-27",114],["2000-07-28",86],["2000-07-29",73],["2000-07-30",52],["2000-07-31",69],["2000-08-01",86],["2000-08-02",118],["2000-08-03",56],["2000-08-04",91],["2000-08-05",121],["2000-08-06",127],["2000-08-07",78],["2000-08-08",79],["2000-08-09",46],["2000-08-10",108],["2000-08-11",80],["2000-08-12",79],["2000-08-13",69],["2000-08-14",80],["2000-08-15",105],["2000-08-16",119],["2000-08-17",105],["2000-08-18",55],["2000-08-19",74],["2000-08-20",41],["2000-08-21",62],["2000-08-22",104],["2000-08-23",118],["2000-08-24",121],["2000-08-25",126],["2000-08-26",99],["2000-08-27",92],["2000-08-28",75],["2000-08-29",91],["2000-08-30",94],["2000-08-31",69],["2000-09-01",93],["2004-07-25",78],["2004-07-26",78],["2004-07-27",59],["2004-07-28",111],["2004-07-29",78],["2004-07-30",30],["2004-07-31",78],["2004-08-01",91],["2004-08-02",119],["2004-08-03",95],["2004-08-04",73],["2004-08-05",76],["2004-08-06",89],["2004-08-07",117],["2004-08-08",145],["2004-08-09",143],["2004-08-10",84],["2004-08-11",84],["2004-08-12",51],["2004-08-13",31],["2007-03-13",133]];

myChart.setOption({
title: {
    text: 'Heartrate Analysis'
    
},
tooltip: {
    trigger: 'axis'
},
xAxis: {
    data: echartdata.map(function (item) {
        return item[0];
    })
},
yAxis: {
     splitLine: {
        show: false
    },
},
toolbox: {
    left: 'center',
    feature: {
        dataZoom: {
            yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
    }
},
dataZoom: [{
    startValue: '2014-06-01'
}, {
    type: 'inside'
}],
visualMap: {
        top: 10,
        right: 10,
        pieces: [{
            gt: 0,
            lte: 50,
            color: '#d63a34'
        }, {
            gt: 50,
            lte: 100,
            color: '#d63a34'
        }, {
            gt: 100,
            lte: 150,
            color: '#d63a34'
        }, {
            gt: 150,
            lte: 200,
            color: '#d63a34'
        }, {
            gt: 200,
            color: '#d63a34'
        
        }],
        outOfRange: {
            color: '#d63a34'
        }
    },

series:{
        markPoint: {
            data: [
                {type: 'max', name: ''},
                {type: 'min', name: ''}
            ]
        },
    
    name: 'Heartrate Analysis',
    type: 'line',
    data: echartdata.map(function (item) {
        return item[1];
    }),
    markLine: {
        silent: true,
        data: [{
            yAxis: 50,
            color: '#d63a34'
        }, {
            yAxis: 100,
            color: '#d63a34'
        }, {
            yAxis: 150,
            color: '#d63a34'
        }, {
            yAxis: 200,
            color: '#d63a34'
        
        }],
        outOfRange: {
            color: '#d63a34'
        }
    }
},
});

//calendar
$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMM D,YYYY') + ' - ' + end.format('MMM D,YYYY'));
    }
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

}); 
//barchart1
var myChart = echarts.init(document.querySelector('#barchart1'));
option = {
    
    xAxis: {
        type: 'category',
        data: ['Male', 'female']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200],
        type: 'bar',
        color:'rgb(56, 141, 175)'
    }]
    
};
myChart.setOption(option);
//barchart2
var myChart = echarts.init(document.querySelector('#barchart2'));
option = {
    xAxis: {
        type: 'category',
        data: ['active', 'inactive']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200],
        type: 'bar',
        color:'rgb(185, 56, 56)'
    }]
};
myChart.setOption(option);



 });
var elem = document.documentElement;
    /* View in fullscreen */
    function dashboardexpand() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    /* Close fullscreen */
    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

 
 