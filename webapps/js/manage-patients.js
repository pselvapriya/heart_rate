var dataSet = [
    ["patient1", "user1", "1.0.0", "6, Anna Nagar", "Alangulam", "20"],
    ["patient2", "user2", "1.0.0", "6, Anna Nagar", "Alangulam", "21"],
    ["patient3", "user3", "1.0.0", "6, Anna Nagar", "Alangulam", "22"],
    ["patient4", "user4", "1.0.0", "6, Anna Nagar", "Alangulam", "24"],
    ["patient5", "user5", "1.0.0", "6, Anna Nagar", "Alangulam", "20"],
    ["patient6", "user6", "1.0.0", "6, Anna Nagar", "Alangulam", "20"],
    ["patient7", "user7", "1.0.0", "6, Anna Nagar", "Alangulam", "20"]

]

$(document).ready(function() {
    $( "#datepicker" ).datepicker();
    $( "#datepicker1" ).datepicker();

    
    $('#managePatient_filter').html('<div>' + 'errrr' + '</div>');
    $('#managePatient').DataTable({
        data: dataSet,
        searching: true,
        columns: [{
                title: 'Patient Id',
                sTitle: 'Patient Id',
                orderable: false,
                mRender: function(data, type, row) {
                    return data;
                }
            },
            {
                title: 'Patient Name',
                sTitle: 'Patient Name',
                orderable: false,
                mRender: function(data, type, row) {
                    return data;
                }
            },
            {
                title: 'Status',
                sTitle: 'Status',
                orderable: false,
                mRender: function(data, type, row) {
                    return '<a href="" class="patient-atag" data-toggle="modal" data-target="#myModal">Link</a>';
                }
            },
            {
                title: 'Address ',
                sTitle: 'Address ',
                orderable: false,
                mRender: function(data, type, row) {
                    return data;
                }
            },
            {
                title: 'City ',
                sTitle: 'City',
                orderable: false,
                mRender: function(data, type, row) {
                    return data;
                }
            },
            {
                title: 'Age',
                sTitle: 'Age',
                orderable: false,
                mRender: function(data, type, row) {
                    return data;
                }
            },
            {
                title: 'Actions',
                sTitle: 'Actions',
                orderable: false,
                mRender: function(data, type, row) {
                    return '<i class="fa fa-pencil-square-o icon-table" aria-hidden="true" data-toggle="modal" data-target="#editModal"></i>' + '&nbsp;&nbsp;' + '<i class="fa fa-trash icon-table" aria-hidden="true"></i>';
                }
            },

        ]

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