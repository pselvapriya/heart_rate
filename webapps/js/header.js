$(document).ready(function() {
  $('.card-div').css('display','none');
  e.preventdefault();
  // $('.overlay-content .nav-link .dashboard').addClass("active");
});
$('#myNav .overlay-content .nav-link').on('click', function(){
      document.getElementById("myNav").style.width = "0%";
      if ($(".overlay-content .nav-link").hasClass("active")) {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
     
 } else {
     $(this).addClass("active");
    }
  });
  function openNav() {
    document.getElementById("myNav").style.width = "15%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
  function openCard(){
    alert("check...")
    $('.card-div').css('display','block!important');
  }
 