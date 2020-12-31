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
    var selectDate = $("#datepicker[name=datepicker]").val();
    // console.log("selectDate",selectDate);
    var DOB = new Date(selectDate);
    var today = new Date();
    var age = today.getTime() - DOB.getTime();
    age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
    console.log(age);
    var gender = $( "#selectGender" ).val();
    var mobile_no = $("#mobile").val();
    var email = $("#email").val();
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var country = $("#country").val();
    var zipcode = $("#zipCode").val();
    

    //Validate
    if(patient_name === ""){
        showToast("Warning","Please a Enter Name",'warning');
        $('#patientModal').show();
    }else if(selectDate === ""){
        showToast("Warning","Please a Enter Date",'warning');
        $('#patientModal').show();
    }else if(mobile_no === ""){
        showToast("Warning","Please a Enter Mobile",'warning');
        $('#patientModal').show();
    }else if(email === ""){
        showToast("Warning","Please a Enter Email",'warning');
        $('#patientModal').show();
    }else if(address === ""){
        showToast("Warning","Please a Enter Address",'warning');
        $('#patientModal').show();
    }else if(city === ""){
        showToast("Warning","Please a Enter City",'warning');
        $('#patientModal').show();
    }else if(state === ""){
        showToast("Warning","Please a Enter State",'warning');
        $('#patientModal').show();
    }else if(country === ""){
        showToast("Warning","Please a Enter Country",'warning');
        $('#patientModal').show();
    }else if(zipcode === ""){
        showToast("Warning","Please a Enter Zipcode",'warning');
        $('#patientModal').show();

    }
    else{

        //Build Input Objects
        var inputObj = {
            patient_name : patient_name,
            dob : selectDate,
            age : age,
            gender : gender,
            mobile_no : mobile_no,
            address : address,
            email : email,
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
                $(".modal-backdrop").remove();
                successMsg("Patient Added Successfully!");
                loadAssetList();
            },
            error: function (e) {

                //Error -> Show Error Alert & Reset the form
                errorMsg("Patient Added Failed!");
                window.location.reload();
            }
        });
    }
}
else if(flag==true){
     patient_name = $("#patient_name").val();
     dob = $("#datepicker1[name=datepicker]").val();
     gender = $('#editGender').val();
     mobile_no = $('#editmobile').val();
     email = $('#editEmail').val();
     address = $("#editAddress").val();
     city = $("#editCity").val();
     state = $("#editState").val();
     country = $("#editCountry").val();
     zipcode = $("#editZipCode").val();
     
     var DOB = new Date(dob);
    var today = new Date();
    var age = today.getTime() - DOB.getTime();
    age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
    created_ts = new Date().getTime()
    var updateData ={
        patient_name : patient_name,
        dob : dob,
        age : age,
        gender : gender,
        mobile_no : mobile_no,
        email : email,
        address : address,
        city : city,
        state : state,
        country : country,
        zipcode : zipcode,
        created_ts : new Date().getTime()
    };
            console.log("update",updateData);
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
                return data ? data : '-';
            }
        },
        {
            mData: 'age',
            sTitle: 'Age',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : '-';
            }
        },
        {
            mData: 'gender',
            sTitle: 'Gender',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : '-';
            }
        },
        {
            mData: 'mobile_no',
            sTitle: 'Mobile Number',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : '-';
            }
        },
        {
            mData: 'email',
            sTitle: 'Email ',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : '-';
            }
        },
        {
            mData: 'address',
            sTitle: 'Address',
            orderable: false,
            mRender: function (data, type, row) {
                return row.address +'&nbsp;'+','+ row.city +','+'<br>'+ row.state +'&nbsp;'+','+ row.zipcode +'.';
            }
        },
        {
            mData: 'country',
            sTitle: 'Country',
            orderable: false,
            mRender: function (data, type, row) {
                return data ? data : '-';
            }
        },      
        {
            mData: 'created_ts',
            sTitle: 'Created Time',
            orderable: false,
            mRender: function (data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            }
        },
        {
            title: 'Status',
            sTitle: 'Status',
            orderable: false,
            mRender: function(data, type, row) {
                return '<button type="button" class="btn patient-atag" data-toggle="modal" data-target="#myModal">Link</button>'
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
                queryParams.query['bool']['should'].push({ "wildcard": { "country": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "country": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "country": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "country": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "country.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "country.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });
                queryParams.query['bool']['should'].push({ "wildcard": { "city": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "city": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "city": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "city": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "city.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "city.keyword": {
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
           $("#datepicker1[name=datepicker]").val(patient1.dob);
           $('#editGender').val(patient1.gender);
           $('#editmobile').val(patient1.mobile_no);
           $('#editEmail').val(patient1.email);
           $('#editAddress').val(patient1.address);
           $('#editCity').val(patient1.city);
           $('#editState').val(patient1.state);
           $('#editCountry').val(patient1.country);
           $('#editZipCode').val(patient1.zipcode);
           console.log("update data",patient1);
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

    

