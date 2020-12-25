var dataSet = [
    ["device1","SIM","1.0.0","HTTP","statys","04/21/2020 pm","04/21/2020 pm","edit"],
    ["device2","SIM","1.0.0","HTTP","statys","04/21/2020 pm","04/21/2020 pm","edit"],
    ["device1","SIM","1.0.0","HTTP","statys","04/21/2020 pm","04/21/2020 pm","edit"],
    ["device1","SIM","1.0.0","HTTP","statys","04/21/2020 pm","04/21/2020 pm","eid"],
    ["device1","SIM","1.0.0","HTTP","statys","04/21/2020 pm","04/21/2020 pm","edit"]
];
 
$(document).ready(function() {
    $('#example_filter').html('<div>'+'errrr' +'</div>');
    $('#example').DataTable( {
        data: dataSet,
        columns: [
            { title: "Device Id" },
            { title: "Device Model" },
            { title: "Version" },
            { title: "Channel" },
            { title: "Status" },
            { title: "Last Reporting Time" },
            { title: "Created Time" },
            { title: "Actions" }
            
        ]
    } );
} );