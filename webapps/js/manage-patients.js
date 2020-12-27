var dataSet = [
    ["device1","SIM","1.0.0","HTTP","statys","04/21/2020 pm"]
]

$(document).ready(function() {
    $('#example_filter').html();
    $('#managePatient').DataTable( {
        data: dataSet,
        columns: [
            { title: "Patient Id" },
            { title: "Patient Name" },
            { title: "Address" },
            { title: "City" },
            { title: "Age"}
            
        ]
    } );
} );