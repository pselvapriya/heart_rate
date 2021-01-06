var myChart = echarts.init(document.getElementById('snapChart'));
var echartdata = [["2004-05-30",66],["2004-05-31",56],["2004-06-01",100],["2004-06-02",109],["2004-06-03",118],["2004-06-04",107],["2004-06-05",74],["2004-06-06",58],["2004-06-07",88],["2004-06-08",100],["2007-03-13",13]];

myChart.setOption({

tooltip: {
    trigger: 'axis'
},
legend: {
    left: "auto"
  },
xAxis: {
    data: echartdata.map(function(item) {
        return item[0];
    })
},
yAxis: {
   
    splitLine: {
       
        color: ["red"],
        show: 'true'
       
    }
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
    
    top: 0,
    right: "9",
    pieces: [{
        gt: 0,
        lte: 60,
        color: '#ff8683'
    }, {
        gt: 60,
        lte: 100,
        color: '#7cd4d4'
    }, {
        gt: 110,
        
        color: '#ff8683'
    },],
    outOfRange: {
        color: '#999'
    }
},
yAxis: [{
    type: "value",
    axisLine: {
        show : "true"  
    }
  }],
  
// yaxis:{
   
//     type:'value',
//     min:200,
//     max:250
// },

series: {
    markPoint: {
        data: [
            {type: 'max', name: 'booma'},
            {type: 'min', name: 'booma'}
        ]
    },
    color: {
     
               colorStops: [
             {
            offset: 1, color: '#c23531' // color at 100% position
        }],
        global: false // false by default
    },
    name: 'heart rate',
    type: 'line',
    data: echartdata.map(function(item) {
        return item[1];
       
    }),
    markLine: {
        silent: true,
        data: [{
            yAxis: 50,lineStyle: {
                color: "#c23531" }
        }, {
            yAxis: 100,lineStyle: {
                color: "c23531" }
        }, {
            yAxis: 150,lineStyle: {
                color: "#c23531" }
        }, {
            yAxis: 200,lineStyle: {
                color: "#c23531" }
        }, {
            yAxis: 300,lineStyle: {
                color: "#c23531" }
        }]
    }
}
});

$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
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