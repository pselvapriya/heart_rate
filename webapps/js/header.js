$(document).ready(function() {
  $('#profileDiv').css('display','none');
 
  // $('.overlay-content .nav-link .dashboard').addClass("menu-active");
});
$('#myNav .overlay-content .nav-link').on('click', function(){
      document.getElementById("myNav").style.width = "0%";
      if ($(".overlay-content .nav-link").hasClass("menu-active")) {
        $(".nav-link").removeClass("menu-active");
        $(this).addClass("menu-active");
     
 } else {
     $(this).addClass("menu-active");
    }
  });
  function openNav() {
    document.getElementById("myNav").style.width = "15%";
  }
  
  function closeNav() {
    // alert("hfjfjgg");
    document.getElementById("myNav").style.width = "0%";
  }
  function openCard(){
    // alert("check...")
    $('#profileDiv').css('display','block');
    e.preventDefault();
  }
 