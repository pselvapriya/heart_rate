var PatientTable = null;
var patient_list = [];
var flag=false;
var sid;

$(document).ready(function(){
    loadAssetList();
});
// patient Registration API

function patientRegistration(){
    if(flag==false){
    var patient_name = $("#patientName").val();
    var dob = $("#dob").val();
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var country = $("#country").val();

    //Validate
    if(patient_name === ""){

        alert("Patient Name is Required!");

    }else if(dob === ""){

        alert("Age is Required!");

    }else if(address === ""){

        alert("Address is Required!");

    }else{

        //Build Input Objects
        var inputObj = {
            patient_name : patient_name,
            dob : dob,
            address : address,
            city : city,
            state : state,
            country : country,
            created_ts : new Date().getTime()
        };
console.log("add user",inputObj);
        //Call API
        $.ajax({
            url: BASE_PATH+"/patient/insert",
            data: JSON.stringify(inputObj),
            contentType: "application/json",
            type: 'POST',
            success: function (result) {

                //Success -> Show Alert & Refresh the page
                successMsg("Registration Completed Successfully!");
                loadStudentList();
            },
            error: function (e) {

                //Error -> Show Error Alert & Reset the form
                errorMsg("Registration Failed!");
                window.location.reload();
            }
        });
    }
}
else if(flag==true){
     patient_name = $("#patient_name").val();
     dob = $("#dob").val();
     address = $("#address").val();
     city = $("#city").val();
     state = $("#state").val();
     country = $("#country").val();

            created_ts = new Date().getTime()

            var updateData ={
                patient_name : patient_name,
                dob : dob,
               address : address,
                city : city,
                 state : state,
                country : country,
                created_ts : new Date().getTime()

            };
            console.log(updateData);
            $.ajax({
                url: BASE_PATH+"/patient/update",
                data: JSON.stringify({_id: sid,updateData}),
                contentType: "application/json",
                type: 'POST',
                success: function (result) {
                    //Success -> Show Alert & Refresh the page
                    successMsg("update Successfully!");
                    loadAssetList();
                },
                error: function (e) {
        
                    //Error -> Show Error Alert & Reset the form
                    errorMsg("Registration Failed!");
                    //window.location.reload();
                }
            });
        }

    }

// Patient list API
function loadAssetList() {

    if (PatientTable) {
        PatientTable.destroy();
        $("#managePatient").html("");
    }

    var fields = [
        {
            mData: 'patient_name',
            sTitle: 'Patient Name',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'gender',
            sTitle: 'Gender',
            orderable: false,
            mRender: function (data, type, row) {
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
            mData: 'city',
            sTitle: 'City',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'state',
            sTitle: 'State',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'country',
            sTitle: 'Country',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'address',
            sTitle: 'Address',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'created_ts',
            sTitle: 'Created Time',
            "className": 'sortingtable',
            mRender: function (data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            }
        },
        {
            sTitle: 'Actions',
            orderable: false,
            mRender: function (data, type, row) {
                return '<i class="fa fa-pencil-square-o icon-table" aria-hidden="true" data-toggle="modal" data-target="#editModal" onclick="editPatient(\'' + row._id + '\')"></i>' + '&nbsp;&nbsp;' + '<i class="fa fa-trash icon-table" aria-hidden="true"></i>';
            }
        }
    ];

    var queryParams = {
        query: {
            "bool": {
                "must": []
            }
        },
        sort: [{ "created_ts": { "order": "asc" } }]
    };

    patient_list = [];

    var tableOption = {
        fixedHeader: false,
        responsive: false,
        paging: true,
        searching: true,
        aaSorting: [[3, 'desc']],
        "ordering": true,
        iDisplayLength: 10,
        lengthMenu: [[10, 50, 100], [10, 50, 100]],
        aoColumns: fields,
        "bProcessing": true,
        "language": {
            "emptyTable": "No data found!",
            "processing": '<i class="fa fa-spinner fa-spin" style="color:#333"></i> Processing'

        },
        "bServerSide": true,
        "sAjaxSource": BASE_PATH+'/patient/list',
        "fnServerData": function (sSource, aoData, fnCallback, oSettings) {


            queryParams.query['bool']['must'] = [];
            queryParams.query['bool']['should'] = [];
            delete queryParams.query['bool']["minimum_should_match"];

            var keyName = fields[oSettings.aaSorting[0][0]]

            var sortingJson = {};
            sortingJson[keyName['mData']] = { "order": oSettings.aaSorting[0][1] };
            queryParams.sort = [sortingJson];

            queryParams['size'] = oSettings._iDisplayLength;
            queryParams['from'] = oSettings._iDisplayStart;

            // queryParams.query['bool']['must'].push({ "match": { "acc_id":SESSION_OBJ.orgs[0]  } });

            var searchText = oSettings.oPreviousSearch.sSearch.trim();

            if (searchText) {
                queryParams.query['bool']['should'].push({ "wildcard": { "patient_name": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "patient_name": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "patient_name": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "patient_name": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "patient_name.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "patient_name.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });
            }

            oSettings.jqXHR = $.ajax({
                "dataType": 'json',
                "contentType": 'application/json',
                "type": "POST",
                "url": sSource,
                "data": JSON.stringify({"query":queryParams}),
                success: function (data) {

                    var resultData = data.result.data;
 
                    patient_list = resultData.data;

                    $(".totalCount").html(data.result.total)

                    resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },
        "initComplete": function (settings, json) {
        }
    };

    PatientTable = $("#managePatient").DataTable(tableOption);
}


var patient1=null;
function editPatient(row){
    console.log(row);
    sid=row;
    flag=true;
    for(var i=0;i<patient_list.length;i++){
       if(patient_list[i]._id==row){
           patient1= patient_list[i];
           $('#patient_name').val(patient1.patient_name);
           $('#dob').val(patient1.dob);
           $('#address').val(patient1.address);
           $('#city').val(patient1.city);
           $('#state').val(patient1.state);
           $('#country').val(patient1.country);
           console.log(patient1);
       }
    }
}

//delete Api

function deletePatient(row){
    console.log(row);

    $.ajax({
        url: BASE_PATH+"/patient/delete",
        data: JSON.stringify({_id:row}),
        contentType: "application/json",
        type: 'POST',
        success: function (result) {
            //Success -> Show Alert & Refresh the page
            successMsg(" deleted Successfully!");
            loadStudentList();
        },
        error: function (e) {

            //Error -> Show Error Alert & Reset the form
            errorMsg("Registration Failed!");
            // window.location.reload();
        }
    });

}

    

