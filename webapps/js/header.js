$(document).ready(function() {
  $('#profileDiv').css('display','none');
  e.preventDefault();
  // $('.overlay-content .nav-link .dashboard').addClass("menu-active");
});
$(document).mouseup(function (e){
var container = $("#profileDiv");
if (!container.is(e.target) && container.has(e.target).length === 0){
container.hide();
}
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
    // e.preventDefault();
  }
 