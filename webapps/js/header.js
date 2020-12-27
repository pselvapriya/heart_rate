$(function() {
  // window.location.href='http://localhost:7201/hrmonitor/main';
});
$('#myNav .overlay-content .nav-link').on('click', function(){
      document.getElementById("myNav").style.width = "0%";
    });
  function openNav() {
    document.getElementById("myNav").style.width = "15%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
  