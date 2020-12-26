

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