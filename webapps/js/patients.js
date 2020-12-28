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
    var patient_name = $("#patient_name").val();
    var dob = $("#dob").val();
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var country = $("#country").val();

    //Validate
    if(patient_name === ""){

        alert("Patient Name is Required!");

    }else if(age === ""){

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
    $("#patient_table").html("");
}

var fields = [
    {
        mData: 'patient_name',
        sTitle: 'patient name',
        sWidth: '20%',
        orderable: false,
        mRender: function (data, type, row) {
            return data;
        }
    },

    {
        mData: 'dob',
        sTitle: 'dob',
        sWidth: '20%',
        orderable: false,
        mRender: function (data, type, row) {
            return data;
        }
    },
    {
        mData: 'did',
        sTitle: 'device id',
        sWidth: '20%',
        orderable: false,
        mRender: function (data, type, row) {
            return data;
        }
    },
    {
        mData: 'address',
        sTitle: 'address',
        sWidth: '20%',
        orderable: false,
        mRender: function (data, type, row) {
            return data;
        }
    },

    {
        mData: 'city',
        sTitle: 'city',
        sWidth: '20%',
        orderable: false,
        mRender: function (data, type, row) {
            return data;
        }
    },
    {
        mData: 'country',
        sTitle: 'country',
        sWidth: '20%',
        orderable: false,
        mRender: function (data, type, row) {
            return data;
        }
    },

    {
        mData: 'created_ts',
        sWidth: '20%',
        sTitle: 'created_time',
        orderable: false,
        "className": 'sortingtable',
        mRender: function (data, type, row) {
            // return data;
            return moment(data).format(DATE_TIME_FORMAT);
        }
    },
    {
        mData: 'linked_ts',
        sTitle: 'linked Time',
        sWidth: '20%',
        orderable: false,    
         "className": 'sortingtable',
        mRender: function (data, type, row) {
            // return data;
             return moment(data).format(DATE_TIME_FORMAT);
        }
    },

    {
        sTitle: 'Actions',
        orderable: false,
        mRender: function (data, type, row) {
            var actionsHtml = '<button class="btn btn-default" onclick="deletePatient(\'' +row["_id"]+'\')"><i class="fa fa-trash"></i></button> <button class="btn btn-default" onclick="editPatient(\'' + row["_id"]+ '\')"><i class="fa fa-edit"></i></button> ';
            return actionsHtml;
        }
    }
];

var queryParams = {
    query: {
        "bool": {
            "must": []
            /*,
            "filter":{"range":{"created_ts":{
                        "gte":new Date(startDate.toISOString()).getTime(),
                        "lte":new Date(endDate.toISOString()).getTime()
                    }}}*/
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

                    console.log(data);

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

    PatientTable = $("#passet_table").DataTable(tableOption);
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

    

