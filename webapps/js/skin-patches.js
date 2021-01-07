var deviceTable = null;
var device_list = [];
// var startDate = moment().subtract(6, 'days').startOf('day');
// var endDate = moment().endOf('day');
$(document).ready(function() {
    loadDeviceList();
    $('.repeat-btn').click(function() {
        // $('.patient-repeat-btn').css('border','none');
        loadDeviceList();
    });
});

var elem = document.documentElement;

function skinpatchesExpand() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function loadDeviceList() {
    if (deviceTable) {
        deviceTable.destroy();
        $("#skin_patches").html("");
    }

    var fields = [{
            mData: "id",
            sTitle: "Device Id",
            sWidth: '10%',
            orderable: false,
            mRender: function(data, type, row) {
                return data ? data : '-';
            },
        },
        {
            mData: "modelId",
            sTitle: "Model Id",
            sWidth: '10%',
            orderable: false,
            mRender: function(data, type, row) {
                return data ? data : '-';
            },
        },
        {
            mData: "version",
            sTitle: "Version",
            sWidth: '10%',
            orderable: false,
            mRender: function(data, type, row) {
                return data ? data : '-';
            },
        },
        {
            mData: "Status",
            sTitle: "Status",
            sWidth: '10%',
            orderable: false,
            mRender: function(data, type, row) {
                if (row.reportedStamp) {
                    return '<span class="label label-success label-device">Reporting</span>';
                } else {
                    return '<span class="label label-danger label-device">Not Reporting</span>';
                }
            },
        },
        {
            mData: "channel",
            sTitle: "Channel",
            sWidth: '10%',
            orderable: false,
            mRender: function(data, type, row) {
                return data ? data : '-';
            },
        },
        {
            mData: "reportedStamp",
            sTitle: "Last Reported Time",
            sWidth: '10%',
            className: "sortingtable",
            mRender: function(data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT) ? moment(data).format(DATE_TIME_FORMAT) : '-';
            },
        },
        {
            mData: "registeredStamp",
            sTitle: "Created Time",
            sWidth: '10%',
            className: "sortingtable",
            mRender: function(data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT) ? moment(data).format(DATE_TIME_FORMAT) : '-';
            },
        },

    ];

    var queryParams = {

        query: {
            bool: {
                must: [],
                should: []
            },
        },
        sort: [{ modelId: { order: "desc" } }],
    };

    device_list = [];

    var tableOption = {
        fixedHeader: true,
        responsive: true,
        paging: true,
        searching: true,
        aaSorting: [
            [5, "desc"]
        ],
        ordering: true,
        iDisplayLength: 10,
        lengthMenu: [
            [10, 50, 100],
            [10, 50, 100],
        ],
        aoColumns: fields,
        bProcessing: true,
        language: {
            emptyTable: "No data found!",
            processing: '<i class="fa fa-spinner fa-spin" style="color:#333"></i> Processing',
        },
        bServerSide: true,
        sAjaxSource: BASE_PATH + "/devicelist/dlist",
        fnServerData: function(sSource, aoData, fnCallback, oSettings) {
            queryParams.query["bool"]["must"] = [{ "match": { domainKey: "XLOYLUDCHY" } }, { "match": { modelId: "Vilpower" } }];
            queryParams.query["bool"]["should"] = [];
            delete queryParams.query["bool"]["minimum_should_match"];

            var keyName = fields[oSettings.aaSorting[0][0]];

            var sortingJson = {};
            sortingJson[keyName["mData"]] = { order: oSettings.aaSorting[0][1] };
            queryParams.sort = [sortingJson];

            queryParams["size"] = oSettings._iDisplayLength;
            queryParams["from"] = oSettings._iDisplayStart;

            // queryParams.query['bool']['must'].push({ "match": { "acc_id":SESSION_OBJ.orgs[0]  } });

            var searchText = oSettings.oPreviousSearch.sSearch.trim();

            if (searchText) {
                queryParams.query["bool"]["should"].push({
                    wildcard: { id: "*" + searchText + "*" },
                });
                queryParams.query["bool"]["should"].push({
                    wildcard: { id: "*" + searchText.toLowerCase() + "*" },
                });
                queryParams.query["bool"]["should"].push({
                    wildcard: { id: "*" + searchText.toUpperCase() + "*" },
                });
                queryParams.query["bool"]["should"].push({
                    wildcard: { id: "*" + capitalizeFLetter(searchText) + "*" },
                });
                queryParams.query["bool"]["minimum_should_match"] = 1;
                queryParams.query["bool"]["should"].push({
                    match_phrase: {
                        "id.keyword": "*" + searchText + "*",
                    },
                });
                queryParams.query["bool"]["should"].push({
                    match_phrase_prefix: {
                        "id.keyword": {
                            query: "*" + searchText + "*",
                        },
                    },
                });
            }

            oSettings.jqXHR = $.ajax({
                "dataType": "json",
                "contentType": "application/json",
                "type": "POST",
                url: sSource,
                "data": JSON.stringify({ query: queryParams }),
                success: function(data) {

                    var resultData = data.result.data;

                    device_list = resultData.data;

                    $(".totalCount").html(data.result.total);

                    resultData["draw"] = oSettings.iDraw;
                    fnCallback(resultData);
                },
            });
        },
        initComplete: function(settings, json) {},
    };

    deviceTable = $("#skin_patches").DataTable(tableOption);
}