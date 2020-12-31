var deviceTable = null;
var device_list = [];
 
// var startDate = moment().subtract(6, 'days').startOf('day');
// var endDate = moment().endOf('day');
 

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

    var dataSet = [
        ["hrmonitor1","SIM","1.0.0","HTTP","statys","04/21/2020 pm","04/21/2020 pm","edit"],
        ["hrmonitor2","SIM","1.0.0","HTTP","statys","04/21/2020 pm","04/21/2020 pm","edit"],
        ["hrmonitor3","SIM","1.0.0","HTTP","statys","04/21/2020 pm","04/21/2020 pm","edit"],
        ["hrmonitor4","SIM","1.0.0","HTTP","statys","04/21/2020 pm","04/21/2020 pm","eid"],
        ["hrmonitor5","SIM","1.0.0","HTTP","statys","04/21/2020 pm","04/21/2020 pm","edit"]
    ];
    
    $(document).ready(function() {
        $('#skin_patches').DataTable( {
            data: dataSet,
            searching: true,
            columns: [
                {
                    title: 'Device Id',
                    sTitle: 'Device Id',
                    orderable: false,
                    mRender: function (data, type, row) {
                        return data;
                    }
                },
                {
                    title: 'Device Model',
                    sTitle: 'Device Model',
                    orderable: false,
                    mRender: function (data, type, row) {
                        return data;
                    }
                },
                {
                    title: 'Version',
                    sTitle: 'Version',
                    orderable: false,
                    mRender: function (data, type, row) {
                        return data;
                    }
                },
                {
                    title: 'Channel',
                    sTitle: 'Channel',
                    orderable: false,
                    mRender: function (data, type, row) {
                        return data;
                    }
                },
                {
                    title: 'Status',
                    sTitle: 'Status',
                    orderable: false,
                    mRender: function (data, type, row) {
                        return '<span class="badge badge-danger">Not Reported</span>';
                    }
                },
                {
                    title: 'Last Reporting Time',
                    sTitle: 'Last Reporting Time',
                    orderable: false,
                    mRender: function (data, type, row) {
                        return data;
                    }
                },
                {
                    title: 'Created Time',
                    sTitle: 'Created Time',
                    orderable: false,
                    mRender: function (data, type, row) {
                        return data;
                    }
                },
                {
                    title: 'Actions',
                    sTitle: 'Actions',
                    orderable: false,
                    mRender: function (data, type, row) {
                        return '<i class="fa fa-pencil-square-o icon-table" aria-hidden="true"></i>'+'&nbsp;&nbsp;'+'<i class="fa fa-trash icon-table" aria-hidden="true"></i>';
                    }
                },
    
            ]
        });
        } );