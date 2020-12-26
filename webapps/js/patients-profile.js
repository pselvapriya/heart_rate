$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }
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
    ["Malli", "Tenkasi", "76", "Normal", "Sleeping", "12001", "9.00pm"],
    ["Kowsi", "Ambai", "61", "Low", "Sleeping", "12002", "11.00pm"],
    ["Raja", "Kadayam", "123", "High", "running", "12003", "6.12am"],

];

$(document).ready(function() {
    $('#patients_profile').DataTable({
        data: dataSet,
        columns: [
            { title: "Name" },
            { title: "Address" },
            { title: "Heart Rate" },
            { title: "Status" },
            { title: "Activity" },
            { title: "Skin Patch Id" },
            { title: "Last Reported Time" }

        ]
    });
});