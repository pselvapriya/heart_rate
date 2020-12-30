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
                    return '<img src="/images/Capture.PNG"style="height:30px;"width:30px">' + data + '&nbsp;' + '<a href="/hrmonitor/main#/snapshot">' + '<i class="fa fa-eye eye-icon" aria-hidden="true"></i>' + '</a>' + '&nbsp;' + '<h6>56 years old</h6>';
                }
            },
            {
                title: 'DOB',
                sTitle: 'DOB',
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
                title: 'Gender',
                sTitle: 'Gender',
                orderable: false,
                mRender: function(data, type, row) {
                    return data;
                }
            },
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
                    return '<button class="status">' + data + '</button>';
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
            {
                mData: 'country',
                sTitle: 'Country',
                orderable: false,
                mRender: function(data, type, row) {
                    return data;
                }
            },
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