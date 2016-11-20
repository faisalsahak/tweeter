$(document).ready(function(){

 $("textarea").keydown(function(){
    var maxLength = 140;
    var textLength = $(this).val().length;
    var remain = maxLength - textLength;
    $("form > span").text(remain);


    if(remain < 0){
      $(".counter").addClass("counterErrorColor");
      // disable button

    } else {
      $(".counter").removeClass("counterErrorColor");
      // enable button
    }
  
  });
});
