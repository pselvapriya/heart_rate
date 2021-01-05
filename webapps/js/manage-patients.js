

$(document).ready(function() {
    $( "#datepicker" ).datepicker();
    $( "#datepicker1" ).datepicker();
    $('.calender-icon').click(function() {
        $("#datepicker").focus();
    });
    $('.edit-calender-icon').click(function() {
        $( "#datepicker1" ).focus();
    });
    $('.patient-repeat-btn').click(function(){
        loadAssetList();
    });
});

var elem = document.documentElement;
    function patientExpand() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { 
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { 
            elem.msRequestFullscreen();
        }
    }
    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { 
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { 
            document.msExitFullscreen();
        }
    }