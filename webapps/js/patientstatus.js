var PatientstatusTable = null;
var patientstatus_list = [];
var patientactivity_list = [];

$(document).ready(function() {
    loadPatientstatusList();
    $(() => {
        // var queryParams = {
        //     "query": {
        //         "bool": {
        //             "must": [{
        //                 "match": {
        //                     "domainKey": "XLOYLUDCHY"
        //                 }

        //             }],
        //             "filter": {
        //                 "term": { "modelId": "Vilpower" }
        //             }
        //         }
        //     },
        //     "from": 0,
        //     "size": 12
        // };
        $.ajax({
            "dataType": 'json',
            "contentType": 'application/json',
            "type": "POST",
            "url": BASE_PATH + '/patientstatus/list',
        
            success: function(data) {
                var resultData = data.result.data.data;
                patientstatus_list = resultData;
                // $("#devicelist").val('');
                

                patientstatus_list.forEach((et) => {
                    let tr = `<option value=` + et.status + `>` + et.status + `</option>`;
                    $("#filter_status").append(tr);
                    
                });
                
                
            },
            
        });
    });

    // activity list
    $(() => {
        var queryParams = {
            
                "aggs": {
                "keys": {
                  "terms": {
                    "field": "activity"
                  }
                }
                }
                        
            }
                        
        $.ajax({
            "dataType": 'json',
            "contentType": 'application/json',
            "type": "POST",
            "url": BASE_PATH + '/patientstatus/list',
            "data": JSON.stringify({
                "query": queryParams
            }),
            success: function(data) {
                var resultData = data.aggregations.activity.buckets;
                // patientactivity_list = resultData;
                console.log("activity",resultData);

                // $("#devicelist").val('');
                patientactivity_list.forEach((patient) => {
                    let tr = `<option value=` + patient.activity + `>` + patient.activity + `</option>`;
                    $("#filter_activity").append(tr);
                    
                });
                
                
            },
            
        });
    });
})

function loadPatientstatusList() {

    if (PatientstatusTable) {
        PatientstatusTable.destroy();
        $("#patients_profile").html("");
    }


    var fields = [{
            mData: 'patient_name',
            sTitle: 'Name',
            sWidth: '10%',
            orderable: false,
            mRender: function(data, type, row) {
                console.log("gender", row.gender)
                if (row.gender === 'female' && row.gender === 'Female') {
                    return '<div class="row row1">' + '<img src="/images/Capture1.PNG"style="height:30px;"width:30px">' + '&nbsp;' + '&nbsp;<a onclick="loadMainPage(\'/snapshot\')"href="#/snapshot"class="p-name">' + row.patient_name + '&nbsp;&nbsp;<i class="fa fa-eye eye-icon" aria-hidden="true"></i>' + '</a>' + '&nbsp;' + '<h6 class="age-tag">' + '<b>' + '&nbsp;' + '&nbsp;' + row.age + '&nbsp;' + 'years old' + '</b>' + '</h6>' + '</div>';
                } else {
                    return '<div class="row row1">' + '<img src="/images/Capture.PNG"style="height:30px;"width:30px">' + '&nbsp;' + '&nbsp;<a onclick="loadMainPage(\'/snapshot\')"href="#/snapshot"class="p-name">' + row.patient_name + '&nbsp;&nbsp;<i class="fa fa-eye eye-icon" aria-hidden="true"></i>' + '</a>' + '&nbsp;' + '<h6 class="age-tag">' + '<b>' + '&nbsp;' + '&nbsp;' + row.age + '&nbsp;' + 'years old' + '</b>' + '</h6>' + '</div>';
                }
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
            sWidth: '13%',
            sTitle: 'Address',
            orderable: false,
            mRender: function(data, type, row) {
                return '<div class="row">' + '<p class="col-12 address">' + row.address +
                    "&nbsp;" +
                    "," +
                    row.city +
                    "," +
                    "<br>" +
                    row.state +
                    "&nbsp;" +
                    "," +
                    row.zipcode +
                    "." + '</p>' + '</div>';
            }
        },
        {
            mData: 'heart_rate',
            sWidth: '23%',
            sTitle: 'Heartrate',
            orderable: false,
            mRender: function(data, type, row) {
                if (row.heart_rate < 60) {
                    return '<div class="row row1">' + '<h3 class="beats">&nbsp;' + row.heart_rate + '</h3>' + '<span class="col-md-5 beat_range"><h6 class="bpm">BPM</h6><h6 class="range">Range 70-130</h6></span>' + '<span class=" col-md-5 heart_icon"><div class="heart-rate">' +
                        '<svg class="heartimg" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="73px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve">' +
                        '                  <polyline fill="none" stroke="orange" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"></polyline>' +
                        '</svg>' + ' <div class="fade-in">' + '</div>' + '<div class="fade-out">' + '</div>' + '</div></span>' + '</div>';

                } else if (row.heart_rate > 120) {

                    return '<div class="row row1">' + '<h3 class="beats">&nbsp;' + row.heart_rate + '</h3>' + '<span class="col-md-5 beat_range"><h6 class="bpm">BPM</h6><h6 class="range">Range 70-130</h6></span>' + '<span class=" col-md-5 heart_icon"><div class="heart-rate">' +
                        '<svg class="heartimg" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="73px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve">' +
                        '                  <polyline fill="none" stroke="red" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"></polyline>' +
                        '</svg>' + ' <div class="fade-in">' + '</div>' + '<div class="fade-out">' + '</div>' + '</div></span>' + '</div>';


                } else {

                    return '<div class="row row1">' + '<h3 class="beats">&nbsp;' + row.heart_rate + '</h3>' + '<span class="col-md-5 beat_range"><h6 class="bpm">BPM</h6><h6 class="range">Range 70-130</h6></span>' + '<span class=" col-md-5 heart_icon"><div class="heart-rate">' +
                        '<svg class="heartimg" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="73px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve">' +
                        '                  <polyline fill="none" stroke="green" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"></polyline>' +
                        '</svg>' + ' <div class="fade-in">' + '</div>' + '<div class="fade-out">' + '</div>' + '</div></span>' + '</div>';

                }
            }
        },

        {
            mData: 'status',
            sWidth: '9%',
            sTitle: 'Status',
            orderable: true,
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
        {
            mData: 'activity',
            sWidth: '9%',
            sTitle: 'Activity',
            orderable: false,
            mRender: function(data, type, row) {
                return '<div class="activity">' + data + '</div>';
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
            sWidth: '9%',
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            }
        },
        {
            mData: 'updated_ts',
            sTitle: 'Last Reported Time',
            sWidth: '18%',
            className: 'sortingtable',
            mRender: function(data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            }
        },

    ];

    var queryParams = {
        query: {
            "bool": {
                "must": []
            }
        },
        sort: [{ "created_ts": { "order": "asc" } }]
    };
    // var queryParams = {
    //     query: {
    //         "bool": {
    //             "must": [
    //                 { "term": { "activity": "runing" } },
    //                 { "term": { "gender": "Male" } },
    //                 { "term": { "status": "Low" } },
    //                 {
    //                     "range": { "age": { "gte": 5, "lte": 20 } }

    //                 }
    //             ]

    //         }
    //     },
    // };


    patientstatus_list = [];
    var tableOption = {
        fixedHeader: true,
        responsive: true,
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
            }

            oSettings.jqXHR = $.ajax({
                "dataType": 'json',
                "contentType": 'application/json',
                "type": "POST",
                "url": sSource,
                "data": JSON.stringify({ "query": queryParams }),
                success: function(data) {


                    var resultData = data.result.data;

                    patientstatus_list = resultData.data;
                    console.log("patient list", patientstatus_list)



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
        $('.patient-div').css('border-top','1px solid red!important');
    } else {
        x.style.display = "block";
        $('.patient-div').css('border-top','1px solid red!important');
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

function reload() {
    loadPatientstatusList();
}

// const reloadtButton = document.querySelector("#patients_profile");
// // Reload everything:
// function reload() {
//     reload = location.reload();
// }
// // Event listeners for reload
// reloadButton.addEventListener("click", reload, false);

//slider

(function() {
    let parent = document.querySelector(".sliderId");
    if (!parent) return;
    let rangeSlide = parent.querySelectorAll("input[type=range]");
    let numberSlide = parent.querySelectorAll("input[type=number]");
    rangeSlide.forEach(function(el) {
        el.oninput = function() {
            let slide1 = parseFloat(rangeSlide[0].value);
            let slide2 = parseFloat(rangeSlide[1].value);
            if (slide1 > slide2) {
                [slide1, slide2] = [slide2, slide1];
            }
            numberSlide[0].value = slide1;
            numberSlide[1].value = slide2;
        }
    });
    numberSlide.forEach(function(el) {
        el.oninput = function() {
            let number1 = parseFloat(numberSlide[0].value);
            let number2 = parseFloat(numberSlide[1].value);
            if (number1 > number2) {
                let tmp = number1;
                numberSlide[0].value = number2;
                numberSlide[1].value = tmp;
            }
            rangeSlide[0].value = number1;
            rangeSlide[1].value = number2;
        }
    });
})();