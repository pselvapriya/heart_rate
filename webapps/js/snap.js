var myChart = echarts.init(document.getElementById('chart'));
var echartdata = [["2001-05-29",101],["2001-05-30",57],["2001-05-31",88],["2001-06-01",99],["2001-06-02",84],["2001-06-03",139],["2001-06-04",132],["2001-06-05",141],["2001-06-07",159],["2001-06-08",131],["2001-06-09",180],["2001-06-10",164],["2001-06-11",134],["2001-06-12",163],["2001-06-13",105],["2001-06-14",74],["2001-06-15",50],["2001-06-16",60],["2001-06-17",82],["2001-06-18",111],["2001-06-19",89],["2001-06-20",81],["2001-06-21",76],["2001-06-22",70],["2001-06-23",74],["2001-06-24",99],["2001-06-25",91],["2001-06-26",113],["2001-06-27",93],["2001-06-28",69],["2001-06-29",74],["2001-06-30",75],["2001-07-01",108],["2001-07-02",115],["2001-07-03",86],["2001-07-04",67],["2001-07-05",68],["2001-07-06",74],["2001-07-07",69],["2001-07-08",95],["2001-07-09",99],["2001-07-10",92],["2001-07-11",84],["2004-05-30",66],["2004-05-31",56],["2004-06-01",100],["2004-06-02",109],["2004-06-03",118],["2004-06-04",107],["2004-06-05",74],["2004-06-06",58],["2004-06-07",88],["2004-06-08",100],["2007-03-13",13]];

myChart.setOption({

tooltip: {
    trigger: 'axis'
},
xAxis: {
    data: echartdata.map(function(item) {
        return item[0];
    })
},
yAxis: {
   
    splitLine: {
        color: ["#3398DB"],
        show: false
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
    top: 10,
    right: 10,
    pieces: [{
        gt: 0,
        lte: 60,
        color: 'orange'
    }, {
        gt: 60,
        lte: 100,
        color: 'blue'
    }, {
        gt: 110,
        
        color: 'red'
    },],
    outOfRange: {
        color: '#999'
    }
},
series: {
    markPoint: {
        data: [
            {type: 'max', name: 'booma'},
            {type: 'min', name: 'booma'}
        ]
    },
    name: 'heart rate',
    type: 'line',
    data: echartdata.map(function(item) {
        return item[1];
       
    }),
    markLine: {
        silent: true,
        data: [{
            yAxis: 50
        }, {
            yAxis: 100
        }, {
            yAxis: 150
        }, {
            yAxis: 200
        }, {
            yAxis: 300
        }]
    }
}
});




$(document).ready(function() {
    $('#patients_profile').DataTable({
        data: dataSet,
        searching: true,
        columns: [{
                title: 'Patient_Name',
                sTitle: 'Patient Name',
                orderable: false,
                mRender: function(data, type, row) {
                    return '<img src="/images/Capture.PNG"style="height:30px;"width:30px">' + row.patient_name + '&nbsp;' + '<a href="/hrmonitor/main#/snapshot">' + '<i class="fa fa-eye eye-icon" aria-hidden="true"></i>' + '</a>' + '&nbsp;' + '<h6>' + row.dob + 'years old</h6>';

                }
            },
           
            {
                title: 'Address',
                sTitle: 'Address',
                orderable: false,
                mRender: function(data, type, row) {
                    return data;
                }
            },
            {
                title: 'Heart Rate',
                sTitle: 'Heart Rate',
                orderable: false,
                mRender: function(data, type, row) {
                    return data + '&nbsp;' + '&nbsp;' + '&nbsp;' + '<i class="fa fa-icon fa-heart-rate" aria-hidden="true"></i>';
                }
            },
            {
                title: 'Status',
                sTitle: 'Status',
                orderable: false,
                mRender: function(data, type, row) {
                    return '<button class="status">' + data + '</button>';
                }
            },
            {
                title: 'Activity',
                sTitle: 'Activity',
                orderable: false,
                mRender: function(data, type, row) {
                    return data;
                }
            },
            // {
            //     mData: 'country',
            //     sTitle: 'Country',
            //     orderable: false,
            //     mRender: function(data, type, row) {
            //         return data;
            //     }
            // },
            {
                title: 'did',
                sTitle: 'Skin Patch Id',
                orderable: false,
                mRender: function(data, type, row) {
                    return data;
                }
            },
            {
                title: 'updated_ts',
                sTitle: 'Last Reported Time',
                orderable: false,
                mRender: function(data, type, row) {
                    return data;
                }
            },

        ]

    });
});