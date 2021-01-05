var PatientstatusTable = null;
var patientstatus_list = [];

$(document).ready(function() {
    loadPatientstatusList();
})

function loadPatientstatusList() {

    if (PatientstatusTable) {
        PatientstatusTable.destroy();
        $("#patients_profile").html("");
    }


    var fields = [{
            mData: 'patient_name',
            sTitle: 'Name',
            sWidth: '20%',
            orderable: false,
            mRender: function(data, type, row) {
                return '<div class="row">' + '<img src="/images/Capture.PNG"style="height:30px;"width:30px">' + '&nbsp;' + '&nbsp;' + row.patient_name + '&nbsp;' + '&nbsp;' +'<a onclick="loadMainPage(\'/snapshot\')"href="#/snapshot">'+ '<i class="fa fa-eye eye-icon" aria-hidden="true"></i>' + '</a>'+'&nbsp;' + '<h6>' + '<b>' + '&nbsp;' + '&nbsp;' + row.age + '&nbsp;' + 'years old' + '</b>' + '</h6>' + '</div>';
            }
        },
        // {
        //     mData: 'dob',
        //     sTitle: 'DOB',
        //     sWidth: '10%',
        //     orderable: false,
        //     mRender: function(data, type, row) {
        //         return data;
        //     }
        // },
        // {
        //     mData: 'age',
        //     sTitle: 'Age',
        //     sWidth: '10%',
        //     orderable: false,
        //     mRender: function(data, type, row) {
        //         return data;
        //     }
        // },
        // {
        //     mData: 'gender',
        //     sTitle: 'Gender',
        //     sWidth: '10%',
        //     orderable: false,
        //     mRender: function(data, type, row) {
        //         return data;
        //     }
        // },

        {
            mData: 'address',
            sWidth: '20%',
            sTitle: 'Address',
            orderable: false,
            mRender: function(data, type, row) {
                return '<div class="row">' + '<p class="col-12">' + data + '</p>' + '</div>';
            }
        },
        {
            mData: 'heart_rate',
            sWidth: '20%',
            sTitle: 'Heartrate',
            orderable: false,
            mRender: function(data, type, row) {
                if (row.heart_rate < 60) {
                    return '<div class="row">' + '<h4 class="col-md-3 beats">' + row.heart_rate + '</h4>' + '<span class="col-md-4"><h4 class="bpm">BPM</h4>Range 70-130</span>' + '<span class=" col-md-5 heart_icon"><div class="heart-rate">' +
                        '<svg class="heartimg" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="73px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve">' +
                        '                  <polyline fill="none" stroke="orange" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"></polyline>' +
                        '</svg>' + ' <div class="fade-in">' + '</div>' + '<div class="fade-out">' + '</div>' + '</div></span>' + '</div>';

                } else if (row.heart_rate > 120) {

                    return '<div class="row">' + '<h4 class="col-md-3 beats">' + row.heart_rate + '</h4>' + '<span class="col-md-4"><h4 class="bpm">BPM</h4>Range 70-130</span>' + '<span class=" col-md-5 heart_icon"><div class="heart-rate">' +
                        '<svg class="heartimg" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="73px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve">' +
                        '                  <polyline fill="none" stroke="red" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"></polyline>' +
                        '</svg>' + ' <div class="fade-in">' + '</div>' + '<div class="fade-out">' + '</div>' + '</div></span>' + '</div>';


                } else {

                    return '<div class="row">' + '<h4 class="col-md-3 beats">' + row.heart_rate + '</h4>' + '<span class="col-md-4"><h4 class="bpm">BPM</h4>Range 70-130</span>' + '<span class=" col-md-5 heart_icon"><div class="heart-rate">' +
                        '<svg class="heartimg" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="73px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve">' +
                        '                  <polyline fill="none" stroke="green" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"></polyline>' +
                        '</svg>' + ' <div class="fade-in">' + '</div>' + '<div class="fade-out">' + '</div>' + '</div></span>' + '</div>';

                }
            }
        },
        {
            mData: 'activity',
            sWidth: '10%',
            sTitle: 'Activity',
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            }
        },
        {
            mData: 'status',
            sWidth: '10%',
            sTitle: 'Status',
            orderable: false,
            mRender: function(data, type, row) {
                if (row.heart_rate < 60) {
                    return '<label class="status_low">' + row.status + '</label>';
                } else if (row.heart_rate > 120) {
                    return '<label class="status_high">' + row.status + '</label>';
                } else {
                    return '<label class="status_normal">' + row.status + '</label>';

                }
            }
        },
        // {
        //     mData: 'country',
        //     sWidth: '20%',
        //     sTitle: 'Country',
        //     orderable: false,
        //     mRender: function(data, type, row) {
        //         return data;
        //     }
        // },
        {
            mData: 'did',
            sTitle: 'Skin Patch Id',
            sWidth: '10%',
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            }
        },
        {
            mData: 'updated_ts',
            sTitle: 'Last Reported Time',
            sWidth: '20%',
            className : 'sortingtable',
            mRender: function(data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            }
        },

    ];

    var queryParams = {
        query: {
            "bool": {
                "must": []
                    /*,
                    "filter":{"range":{"created_ts":{
                                "gte":new Date(startDate.toISOString()).getTime(),
                                "lte":new Date(endDate.toISOString()).getTime()
                            }}}*/
            }
        },
        sort: [{ "created_ts": { "order": "asc" } }]
    };
    var filterquery = {
        query: {
            "bool": {
                "filter": [
                    { "term": { "gender": "Male" } },
                    { "term": { "activity": "sleeping" } }

                ]
            }
        }
    }

    patientstatus_list = [];

    var tableOption = {
        fixedHeader: false,
        responsive: false,
        paging: true,
        searching: true,
        aaSorting: [
            [3, 'desc']
        ],
        "ordering": true,
        iDisplayLength: 10,
        lengthMenu: [
            [10, 50, 100],
            [10, 50, 100]
        ],
        aoColumns: fields,
        "bProcessing": true,
        "language": {
            "emptyTable": "No data found!",
            "processing": '<i class="fa fa-spinner fa-spin" style="color:#333"></i> Processing'

        },
        "bServerSide": true,
        "sAjaxSource": BASE_PATH + '/patientstatus/list',
        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {


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
                    "match_phrase": {
                        "patient_name.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "patient_name.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });
                
                    queryParams.query['bool']['should'].push({ "wildcard": { "address": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "address": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "address": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "address": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "address.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "address.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });
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
                queryParams.query['bool']['should'].push({ "wildcard": { "status": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "status": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "status": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "status": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "status.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "status.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });
                
                
                
                
            }

            oSettings.jqXHR = $.ajax({
                "dataType": 'json',
                "contentType": 'application/json',
                "type": "POST",
                "url": sSource,
                "data": JSON.stringify({ "query": queryParams }),
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

    PatientstatusTable = $("#patients_profile").DataTable(tableOption);
}


$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
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

function myFunction() {
    var x = document.getElementById("contt");
    if (x.style.display === "block") {
        x.style.display = "block";
    } else {
        x.style.display = "block";
    }
}

function hideFunction() {
    var x = document.getElementById("contt");
    if (x.style.display === "none") {
        x.style.display = "none";
    } else {
        x.style.display = "none";
    }
}

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
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
            // {
            //     title: 'DOB',
            //     sTitle: 'DOB',
            //     orderable: false,
            //     mRender: function(data, type, row) {
            //         return data;
            //     }
            // },
            // {
            //     title: 'Age',
            //     sTitle: 'Age',
            //     orderable: false,
            //     mRender: function(data, type, row) {
            //         return data;
            //     }
            // },
            // {
            //     title: 'Gender',
            //     sTitle: 'Gender',
            //     orderable: false,
            //     mRender: function(data, type, row) {
            //         return data;
            //     }
            // },
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
                    return '<label class="status">' + data + '</label>';
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
const reloadtButton = document.querySelector("#patients_profile");
// Reload everything:
function reload() {
    reload = location.reload();
}
// Event listeners for reload
reloadButton.addEventListener("click", reload, false);

//slider js