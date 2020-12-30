var deviceTable = null;
var device_list = [];
// var startDate = moment().subtract(6, 'days').startOf('day');
// var endDate = moment().endOf('day');
$(document).ready(function() {
    loadDeviceList();
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
            sWidth: "20%",
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            },
        },
        {
            mData: "modelId",
            sTitle: "Model Id",
            sWidth: "20%",
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            },
        },

        {
            mData: "version",
            sTitle: "Version",
            sWidth: "20%",
            orderable: false,
            mRender: function(data, type, row) {
                return data;
            },
        },
        {
            mData: "registeredStamp",
            sTitle: "Created Time",
            className: "sortingtable",
            mRender: function(data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            },
        },
    ];

    var queryParams = {
        query: {
            bool: {
                must: [],
            },
        },
        sort: [{ created_ts: { order: "asc" } }],
    };

    device_list = [];

    var tableOption = {
        fixedHeader: false,
        responsive: false,
        paging: true,
        searching: true,
        aaSorting: [
            [3, "desc"]
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
        sAjaxSource: BASE_PATH + "/devicelist/list",
        fnServerData: function(sSource, aoData, fnCallback, oSettings) {
            queryParams.query["bool"]["must"] = [];
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
                dataType: "json",
                contentType: "application/json",
                type: "GET",
                url: sSource,
                data: JSON.stringify({ query: queryParams }),
                success: function(data) {
                    console.log(data);

                    var resultData = data.result.data;
                    console.log(resultData);
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