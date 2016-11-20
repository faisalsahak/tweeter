$(document).ready(function(){
$('.new-tweet').hide();
  $('.compose').click(function(){
    $('.new-tweet').slideToggle(function(){
      $('textarea').focus();
    });
  })


});
