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

// chart
var myChart = echarts.init(document.getElementById('chart'));
var echartdata = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2001-03-30",71],["2001-03-31",73],["2001-04-01",139],["2001-04-02",224],["2001-04-03",107],["2001-04-04",150],["2001-04-05",180],["2001-04-06",77],["2001-04-07",95],["2001-04-08",194],["2001-04-09",143],["2001-04-10",205],["2001-04-11",129],["2001-04-12",64],["2001-04-13",61],["2001-04-14",79],["2001-04-15",121],["2001-04-16",130],["2001-04-17",150],["2001-04-18",205],["2001-04-19",154],["2001-04-20",81],["2001-04-21",140],["2001-04-22",119],["2001-04-23",156],["2001-04-24",72],["2001-04-25",108],["2001-04-26",124],["2001-04-27",94],["2001-04-28",157],["2001-04-29",100],["2001-04-30",158],["2001-05-01",277],["2001-05-02",332],["2001-05-03",303],["2001-05-04",238],["2001-05-05",500],["2001-05-06",99],["2001-05-07",93],["2001-05-08",104],["2001-05-09",74],["2001-05-10",68],["2001-05-11",90],["2001-05-12",114],["2001-05-13",142],["2001-05-14",126],["2001-05-15",185],["2001-05-16",402],["2001-05-17",189],["2001-05-17",189],["2001-05-17",189],["2001-05-18",112],["2001-05-19",137],["2001-05-20",158],["2001-05-21",158],["2001-05-22",116],["2001-05-23",132],["2001-05-24",110],["2001-05-25",82],["2001-05-26",56],["2001-05-27",54],["2001-05-28",71],["2001-05-29",101],["2001-05-30",57],["2001-05-31",88],["2001-06-01",99],["2001-06-02",84],["2001-06-03",139],["2001-06-04",132],["2001-06-05",141],["2001-06-07",159],["2001-06-08",131],["2001-06-09",180],["2001-06-10",164],["2001-06-11",134],["2001-06-12",163],["2001-06-13",105],["2001-06-14",74],["2001-06-15",50],["2001-06-16",60],["2001-06-17",82],["2001-06-18",111],["2001-06-19",89],["2001-06-20",81],["2001-06-21",76],["2001-06-22",70],["2001-06-23",74],["2001-06-24",99],["2001-06-25",91],["2001-06-26",113],["2001-06-27",93],["2001-06-28",69],["2001-06-29",74],["2001-06-30",75],["2001-07-01",108],["2001-07-02",115],["2001-07-03",86],["2001-07-04",67],["2001-07-05",68],["2001-07-06",74],["2001-07-07",69],["2001-07-08",95],["2001-07-09",99],["2001-07-10",92],["2001-07-11",84],["2004-05-30",66],["2004-05-31",56],["2004-06-01",100],["2004-06-02",109],["2004-06-03",118],["2004-06-04",107],["2004-06-05",74],["2004-06-06",58],["2004-06-07",88],["2004-06-08",100],["2004-06-09",109],["2004-06-10",125],["2004-06-11",114],["2004-06-12",110],["2004-06-13",118],["2004-06-14",135],["2004-06-15",147],["2004-06-16",99],["2004-06-17",29],["2004-06-18",75],["2004-06-19",73],["2004-06-20",97],["2004-06-21",102],["2004-06-22",93],["2004-06-23",78],["2004-06-24",58],["2004-06-25",61],["2004-06-26",100],["2004-06-27",106],["2004-06-28",139],["2004-06-29",152],["2004-06-30",49],["2004-07-01",46],["2004-07-02",85],["2004-07-03",97],["2004-07-04",58],["2004-07-05",56],["2004-07-06",59],["2004-07-07",74],["2004-07-08",63],["2004-07-09",59],["2004-07-10",91],["2004-07-11",70],["2004-07-12",53],["2004-07-13",55],["2004-07-14",67],["2004-07-15",97],["2004-07-16",123],["2004-07-17",118],["2004-07-18",100],["2004-07-19",80],["2004-07-20",135],["2004-07-21",67],["2004-07-22",70],["2004-07-23",105],["2004-07-24",55],["2004-07-25",78],["2004-07-26",78],["2004-07-27",59],["2004-07-28",111],["2004-07-29",78],["2004-07-30",30],["2004-07-31",78],["2004-08-01",91],["2004-08-02",119],["2004-08-03",95],["2004-08-04",73],["2004-08-05",76],["2004-08-06",89],["2004-08-07",117],["2004-08-08",145],["2004-08-09",143],["2004-08-10",84],["2004-08-11",84],["2004-08-12",51],["2004-08-13",31],["2007-03-13",133]];

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
        color: 'yellow'
    }, {
        gt: 110,
        
        color: 'red'
    },],
    outOfRange: {
        color: '#999'
    }
},
series: {
    name: 'Beijing AQI',
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



var patientTable = null;
var patient_list = [];
// var startDate = moment().subtract(6, 'days').startOf('day');
// var endDate = moment().endOf('day');

$(document).ready(function(){
    loadPatientList();
})



function loadPatientList() {

    if (patientTable) {
      patientTable.destroy();
        $("#snap").html("");
    }

    var fields = [
        {
            mData: 'heart_rate',
            sTitle: 'Heart Rate',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'activity',
            sTitle: 'Activity',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },

        {
            mData: 'did',
            sWidth: '20%',
            sTitle: 'skin patch ID',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
       
        {
            mData: 'reported_ts',
            sTitle: 'Reported Time',
            "className": 'sortingtable',
            orderable: false,
            mRender: function (data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            }
        },
        // {
        //     sTitle: 'Actions',
        //     orderable: false,
        //     mRender: function (data, type, row) {
        //         var actionsHtml = '<button class="btn btn-default" onclick="deleteDevice(\'' + row.id + '\')"><i class="fa fa-trash"></i></button>'+" "+'<button class="btn btn-default" onclick="editDevice(\'' + row._id + '\')"><i class="fa fa-edit"></i></button>';
        //         return actionsHtml;
        //     }
        // }
       
    ];
    

    var queryParams = {
        query: {
            "bool": {
                "must": []
            }
        },
        sort: [{ "created_ts": { "order": "asc" } }]
    };

    patient_list = [];

    var tableOption = {
        fixedHeader: false,
        responsive: false,
        paging: true,
        searching: true,
        aaSorting: [[3, 'desc']],
        "ordering": true,
        iDisplayLength: 10,
        lengthMenu: [[10, 50, 100], [10, 50, 100]],
        aoColumns: fields,
        "bProcessing": true,
        "language": {
            "emptyTable": "No data found!",
            "processing": '<i class="fa fa-spinner fa-spin" style="color:#333"></i> Processing'

        },
        "bServerSide": true,
        "sAjaxSource": BASE_PATH+'/patienthistory/list',
        "fnServerData": function (sSource, aoData, fnCallback, oSettings) {


            queryParams.query['bool']['must'] = [];
            queryParams.query['bool']['should'] = [];
            delete queryParams.query['bool']["minimum_should_match"];

            var keyName = fields[oSettings.aaSorting[0][0]]

            var sortingJson = {};
            sortingJson[keyName['mData']] = { "order": oSettings.aaSorting[0][1] };
            queryParams.sort = [sortingJson];

            queryParams['size'] = oSettings._iDisplayLength;
            queryParams['from'] = oSettings._iDisplayStart;

            // queryParams.query['bool']['must'].push({ "match": { "acc_id":SESSION_OBJ.orgs[0]  } });

            var searchText = oSettings.oPreviousSearch.sSearch.trim();

            if (searchText) {
                queryParams.query['bool']['should'].push({ "wildcard": { "activity": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "activity": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "activity": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "activity": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "activity.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "activity.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });
            }

            oSettings.jqXHR = $.ajax({
                "dataType": 'json',
                "contentType": 'application/json',
                "type": "post",
                "url": sSource,
                "data": JSON.stringify({"query":queryParams}),
                success: function (data) {

                    console.log(data);

                    var resultData = data.result.data;

                    device_list = resultData.data;

                    $(".totalCount").html(data.result.total)

                    resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },
      
    };

    DeviceTable = $("#snap").DataTable(tableOption);
}
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

var elem = document.getElementById("expand");
var elem = document.documentElement;

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
