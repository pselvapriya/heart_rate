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
            sWidth: '100px',
            orderable: false,
            mRender: function(data, type, row) {
                return '<div class="row">' + '<img src="/images/Capture.PNG"style="height:30px;"width:30px">' + '&nbsp;' + '&nbsp;' + row.patient_name + '&nbsp;' + '<a href="#/snapshot">' + '&nbsp;' + '<i class="fa fa-eye eye-icon" aria-hidden="true"onclick="snapShot(\'' + row._id + '\' )"></i>' + '</a>' + '&nbsp;' + '<h6>' + '<b>' + '&nbsp;' + '&nbsp;' + row.age + '&nbsp;' + 'years old' + '</b>' + '</h6>' + '</div>';
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
            // sWidth: '200px',
            sTitle: 'Address',
            orderable: false,
            mRender: function(data, type, row) {
                return '<div class="row">' + '<p class="col-12">' + data + '</p>' + '</div>';
            }
        },
        {
            mData: 'heart_rate',
            sWidth: '340px',
            sTitle: 'Heartrate',
            orderable: false,
            mRender: function(data, type, row) {
                if (row.heart_rate < 60) {
                    return '<div class="row">' + '<h4 class="col-md-3 beats">' + row.heart_rate + '</h4>' + '<span class="col-md-4"><h4 class="bpm">BPM</h4>Range 70-130</span>' + '<span class=" col-md-5 heart_icon"><div class="heart-rate">' +
                        '<svg class="heartimg" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="93px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve">' +
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
            // sWidth: '150px',
            sTitle: 'Activity',
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            }
        },
        {
            mData: 'status',
            // sWidth: '150px',
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
            // sWidth: '130px',
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            }
        },
        {
            mData: 'updated_ts',
            sTitle: 'Last Reported Time',
            // sWidth: '230px',
            "className": 'sortingtable',
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