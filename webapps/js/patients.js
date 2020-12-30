var PatientTable = null;
var patient_list = [];
var flag=false;
var sid;

$(document).ready(function(){
    loadAssetList();
});
// patient Registration API

function addPatient(){
    if(flag==false){
    var patient_name = $("#patientName").val();
    selectDate = $("#datepicker[name=datepicker]").val();
    console.log("selectDate",selectDate);
    var DOB = new Date(selectDate);
    var today = new Date();
    var age = today.getTime() - DOB.getTime();
    age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
    console.log(age);
    // var dob = $(".dob").val();
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var country = $("#country").val();
    var zipcode = $("#zipCode").val();
   
    //Validate
    if(patient_name === ""){

        showToast("title","msg");
        $('#patientModal').show();

    }else if(city === ""){

        $('.city-field').css('display','block');
        $('.name-field,.state-field,.zip-field,.addr-field,.country-field').css('display','none');
        $('#patientModal').show();

    }else if(state === ""){

        $('.state-field').css('display','block');
        $('.name-field,.city-field,.zip-field,.addr-field,.country-field').css('display','none');
        $('#patientModal').show();

    }else if(zipcode === ""){

        $('.zip-field').css('display','block');
        $('.name-field,.city-field,.state-field,.addr-field,.country-field').css('display','none');
        $('#patientModal').show();

    }else if(address === ""){

        $('.addr-field').css('display','block');
        $('.name-field,.city-field,.state-field,.zip-field,.country-field').css('display','none');
        $('#patientModal').show();

    }else if(country === ""){

        $('.country-field').css('display','block');
        $('.name-field,.city-field,.state-field,.zip-field,.addr-field').css('display','none');
        $('#patientModal').show();

    }
    else{

        //Build Input Objects
        var inputObj = {
            patient_name : patient_name,
            dob : age,
            address : address,
            city : city,
            state : state,
            country : country,
            zipcode : zipcode,
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
                $('#patientModal').hide();
                $('.name-field,.city-field,.state-field,.zip-field,.addr-field,.country-field').css('display','none');
                successMsg("Patients Added Successfully!");
                loadAssetList();
            },
            error: function (e) {

                //Error -> Show Error Alert & Reset the form
                errorMsg("Patients Added Failed!");
                window.location.reload();
            }
        });
    }
}
else if(flag==true){
     patient_name = $("#patient_name").val();
     dob = $(".editAge").val();
     city = $("#editCity").val();
     state = $("#editState").val();
     zipcode = $("#editZipCode").val();
     address = $("#editAddress").val();
     country = $("#editCountry").val();
     
    created_ts = new Date().getTime()
    var updateData ={
        patient_name : patient_name,
        dob : dob,
        city : city,
        state : state,
        zipcode : zipcode,
        address : address,
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
                    successMsg("Patient Updated Successfully!");
                    loadAssetList();
                },
                error: function (e) {
        
                    //Error -> Show Error Alert & Reset the form
                    errorMsg("Patient Updated Failed!");
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
            mData: 'age',
            sTitle: 'Age',
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
            sTitle: 'Actions',
            orderable: false,
            mRender: function (data, type, row) {
                return '<i class="fa fa-pencil-square-o icon-table" aria-hidden="true" data-toggle="modal" data-target="#editModal" onclick="editPatient(\'' + row._id + '\')"></i>' + '&nbsp;&nbsp;' + '<i class="fa fa-trash icon-table" aria-hidden="true" onclick="deletePatient(\'' + row._id + '\')"></i>';
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
    // console.log("row",row);
    sid=row;
    flag=true;
    for(var i=0;i<patient_list.length;i++){
       if(patient_list[i]._id==row){
           patient1= patient_list[i];
           $('#patient_name').val(patient1.patient_name);
           $('.editAge').val(patient1.dob );
           $('#editCity').val(patient1.city);
           $('#editState').val(patient1.state);
           $('#editZipCode').val(patient1.editZipCode);
           $('#editAddress').val(patient1.address);
           $('#editCountry').val(patient1.country);

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
            successMsg("Patient Deleted Successfully!");
            loadAssetList();
        },
        error: function (e) {

            //Error -> Show Error Alert & Reset the form
            errorMsg("Patient Deleted Failed!");
            // window.location.reload();
        }
    });

}

    

