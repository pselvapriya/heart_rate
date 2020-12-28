$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

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

function confirmRefresh() {
    var okToRefresh = confirm("Do you really want to refresh the page?");
    if (okToRefresh) {
        setTimeout("location.reload(true);", 1500);
    }
}

var dataSet = [
    ["Malli", "09/08/1999", "21", "Female", "Tenkasi", "76", "Normal", "Sleeping", "12001", "9.00pm"],
    ["Kowsi", "18/04/1999", "21", "Female", "Ambai", "61", "Low", "Sleeping", "12002", "11.00pm"],
    ["Raja", "31/03/1999", "21", "male", "Kadayam", "123", "High", "running", "12003", "6.12am"],

];

$(document).ready(function() {
    $('#patients_profile').DataTable({
        data: dataSet,
        columns: [
            { title: "Patient-Name" },
            { title: "DOB" },
            { title: "Age" },
            { title: "Gender" },
            { title: "Address" },
            { title: "Heart Rate" },
            { title: "Status" },
            { title: "Activity" },
            { title: "Skin Patch Id" },
            { title: "Last Reported Time" }

        ]
    });
});
$(".js-range-slider").ionRangeSlider({
    skin: "flat",
    grid: true,
    min: 0,
    max: 100,
    from: 21,
    max_postfix: "+",
    prefix: "Age: ",
    postfix: " years"
});



(function() {

    var parent = document.querySelector(".price-slider");
    if (!parent) return;

    var
        rangeS = parent.querySelectorAll("input[type=range]"),
        numberS = parent.querySelectorAll("input[type=number]");

    rangeS.forEach(function(el) {
        el.oninput = function() {
            var slide1 = parseFloat(rangeS[0].value),
                slide2 = parseFloat(rangeS[1].value);

            if (slide1 > slide2) {
                [slide1, slide2] = [slide2, slide1];
            }

            numberS[0].value = slide1;
            numberS[1].value = slide2;
        }
    });

    numberS.forEach(function(el) {
        el.oninput = function() {
            var number1 = parseFloat(numberS[0].value),
                number2 = parseFloat(numberS[1].value);

            if (number1 > number2) {
                var tmp = number1;
                numberS[0].value = number2;
                numberS[1].value = tmp;
            }

            rangeS[0].value = number1;
            rangeS[1].value = number2;

        }
    });

})();