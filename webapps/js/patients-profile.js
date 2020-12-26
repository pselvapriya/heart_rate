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
    ["Veera", "aalangulam", "79", "Normal", "sitting", "12004", "8.23am"],
    ["Asha", "Tenkasi", "135", "High", "walking", "12005", "5.37pm"],
    ["Mani", "Aalangulam", "72", "Normal", "sitting", "12006", "6.00pm"],
    ["Mery", "Ambai", "125", "High", "jogging", "12007", "5.40am"],
    ["Elango", "Tenkasi", "70", "Normal", "Sleeping", "12008", "9.00am"],
    ["Sankari", "Kadayam", "62", "Low", "sitting", "12009", "4.40pm"],
    ["Mega", "Tenkasi", "115", "Normal", "walking", "120010", "7.00pm"],
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