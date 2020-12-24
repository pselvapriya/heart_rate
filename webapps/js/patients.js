var PatientTable = null;
var patient_list = [];

$(document).ready(function(){
    loadPatientList();
});


function loadPatientList() {
    if (PatientTable ) {
        PatientTable .destroy();
        $("#passet_table").html("");

}
var fields = [
    {
        mData: 'assetname',
        sTitle: 'Asset name',
        sWidth: '20%',
        orderable: false,
        mRender: function (data, type, row) {
            return data;
        }
    },
    {
        mData: 'did',
        sTitle: 'device id',
        sWidth: '20%',
        orderable: false,
        mRender: function (data, type, row) {
            return data;
        }
    },

    {
        mData: 'created_ts',
        sWidth: '20%',
        sTitle: 'created_time',
        orderable: false,
        "className": 'sortingtable',
        mRender: function (data, type, row) {
            // return data;
            return moment(data).format(DATE_TIME_FORMAT);
        }
    },
    {
        mData: 'linked_ts',
        sTitle: 'linked Time',
        sWidth: '20%',
        orderable: false,    
         "className": 'sortingtable',
        mRender: function (data, type, row) {
            // return data;
             return moment(data).format(DATE_TIME_FORMAT);
        }
    }
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
    "sAjaxSource": BASE_PATH+'/student/list',
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
            queryParams.query['bool']['should'].push({ "wildcard": { "sname": "*" + searchText + "*" } });
            queryParams.query['bool']['should'].push({ "wildcard": { "sname": "*" + searchText.toLowerCase() + "*" } });
            queryParams.query['bool']['should'].push({ "wildcard": { "sname": "*" + searchText.toUpperCase() + "*" } });
            queryParams.query['bool']['should'].push({ "wildcard": { "sname": "*" + capitalizeFLetter(searchText) + "*" } })
            queryParams.query['bool']["minimum_should_match"] = 1;
            queryParams.query['bool']['should'].push({
                "match_phrase": {
                    "sname.keyword": "*" + searchText + "*"
                }
            })
            queryParams.query['bool']['should'].push({
                "match_phrase_prefix": {
                    "sname.keyword": {
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
            "data": JSON.stringify({"query":queryParams}),
            success: function (data) {

                console.log(data);

                var resultData = data.result.data;

                student_list = resultData.data;

                $(".totalCount").html(data.result.total)

                resultData['draw'] = oSettings.iDraw;
                fnCallback(resultData);
            }
        });
    },
    "initComplete": function (settings, json) {
    }
};

StudentTable = $("#student_table").DataTable(tableOption);
}


    


