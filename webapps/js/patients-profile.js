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


var dataSet = [
    ["Malli", "09/08/1999", "21", "Female", "Tenkasi", "76", "Normal", "Sleeping", "12001", "9.00pm"],
    ["Kowsi", "18/04/1999", "21", "Female", "Ambai", "61", "Low", "Sleeping", "12002", "11.00pm"],
    ["Raja", "31/03/1999", "21", "male", "Kadayam", "123", "High", "running", "12003", "6.12am"],

];

$(document).ready(function() {
    $('#patients_profile').DataTable({
        data: dataSet,
        columns: [
            { title: "Patient-Name" },
            { title: "DOB" },
            { title: "Age" },
            { title: "Gender" },
            { title: "Address" },
            { title: "Heart Rate" },
            { title: "Status" },
            { title: "Activity" },
            { title: "Skin Patch Id" },
            { title: "Last Reported Time" }

        ]
    });
});