var myChart = echarts.init(document.getElementById('chart'));
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
var PatientstatusTable = null;
var patientstatus_list = [];

$(document).ready(function() {
    loadPatientstatusList();
})

function loadPatientstatusList() {

    if (PatientstatusTable) {
        PatientstatusTable.destroy();
        $("#patients").html("");
    }


    var fields = [ {
            mData: 'heart_rate',
            sWidth: '250px',
           
            sTitle: 'Heartrate',
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            }
        },
        {
            mData: 'status',
            sWidth: '150px',
            sTitle: 'Status',
            orderable: false,
            mRender: function(data, type, row) {
                if (row.heart_rate < 60) {
                    return '<label class="sts-low">' + row.status + '</label>';
                } else if (row.heart_rate > 120) {
                    return '<label class="sts-high">' + row.status + '</label>';
                } else {
                    return '<label class="sts-normal">' + row.status + '</label>';

                }
            }
        },
        {
            mData: 'activity',
            sWidth: '150px',
            sTitle: 'Activity',
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            }
        },
 
      
        {
            mData: 'did',
            sTitle: 'Skin Patch Id',
            sWidth: '130px',
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            }
        },
        {
            mData: 'reported_ts',
            sTitle: 'Last Reported Time',
            sWidth: '250px',
            "className": 'sortingtable',
            mRender: function(data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            }
        },

    ];

    var queryParams = {
        query: {
            bool: {
                must: []
                    /*,
                    "filter":{"range":{"created_ts":{
                                "gte":new Date(startDate.toISOString()).getTime(),
                                "lte":new Date(endDate.toISOString()).getTime()
                            }}}*/
            }
        },
        sort: [{ "created_ts": { "order": "asc" } }]
    };
   


    patientstatus_list = [];

    var tableOption = {
        fixedHeader: false,
        responsive: false,
        paging: true,
        searching: true,
        aaSorting: [
            [3, 'desc']
        ],
        ordering: true,
        iDisplayLength: 10,
        lengthMenu: [
            [10, 50, 100],
            [10, 50, 100]
        ],
        aoColumns: fields,
        bProcessing: true,
        language: {
            "emptyTable": "No data found!",
            "processing": '<i class="fa fa-spinner fa-spin" style="color:#333"></i> Processing'

        },
        bServerSide: true,
        sAjaxSource: BASE_PATH + '/patienthistory/list',
        fnServerData: function(sSource, aoData, fnCallback, oSettings) {


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
                queryParams.query['bool']['should'].push({ "wildcard": { "patient_name": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "patient_name": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "patient_name": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "patient_name": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    match_phrase: {
                        "patient_name.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    match_phrase_prefix: {
                        "patient_name.keyword": {
                            query: "*" + searchText + "*",
                        }
                    }
                });
            }

            oSettings.jqXHR = $.ajax({
                dataType: 'json',
                contentType: 'application/json',
                type: "POST",
                url: sSource,
                data: JSON.stringify({ query: queryParams }),
                success: function(data) {

                    // console.log(data);

                    var resultData = data.result.data;
                    console.log(resultData);

                    patientstatus_list = resultData.data;

                    $(".totalCount").html(data.result.total)

                    resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },
        "initComplete": function(settings, json) {}
    };

    PatientstatusTable = $("#patients").DataTable(tableOption);
}
 