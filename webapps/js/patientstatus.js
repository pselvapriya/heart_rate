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
            sWidth: '220px',
            orderable: false,
            mRender: function(data, type, row) {
                return '<img src="/images/Capture.PNG"style="height:30px;"width:30px">' + '&nbsp;'+'&nbsp;'+'&nbsp;'+row.patient_name + '&nbsp;'+'&nbsp;'+ '<a href="/hrmonitor/main#/snapshot">' + '<i class="fa fa-eye eye-icon" aria-hidden="true"></i>' + '</a>' + '&nbsp;' + '<h6>' + '&nbsp;'+'&nbsp;'+ row.age + 'years old</h6>';
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
            sWidth: '220px',
            sTitle: 'Address',
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            }
        },
        {
            mData: 'heart_rate',
            sWidth: '250px',
            sTitle: 'Heartrate',
            orderable: false,
            mRender: function(data, type, row) {
                return '<h5>' + data + '</h5>';
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
            mData: 'status',
            sWidth: '150px',
            sTitle: 'Status',
            orderable: false,
            mRender: function(data, type, row) {
                return '<button class="status">' + data + '</button>';
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
            sWidth: '250px',
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            }
        },
        {
            mData: 'updated_ts',
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
                "filter":[
                    { "term": { "gender": "Male"   }},
        { "term": { "activity": "sleeping" }}

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

                    console.log(data);

                    var resultData = data.result.data;

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