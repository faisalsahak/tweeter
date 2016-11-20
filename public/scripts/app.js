 $(document).ready(function () {
  // $('.popUp').hide();

   var messageContainer = $('#tweet-container');

   function createTweetHeader(user) {
     var header = $('<header>');
     var avatar = $('<img>');
     avatar.addClass("avatars").attr("src", user.avatars.regular);
     var username = $('<p>')
     username.addClass("name").text(user.name);
     var handle = $('<span>');
     handle.addClass("handle").text(user.handle);
     header.append([avatar, username, handle]);
     return header;
   }

   function createTweetContent(content) {
     return $('<p>').addClass("tweetContent").text(content.text);
   }

   function createTweetFooter(createdDate) {
     var footer = $('<footer>');
     var createdAt = $("<span>").addClass("tweetDate").text(moment(createdDate).fromNow());

     footer.append(createdAt);
     return footer;
      }



   function createTweetElement(tweet) {
     var header = createTweetHeader(tweet.user);
     var tweetContent = createTweetContent(tweet.content);
     var footer = createTweetFooter(tweet.created_at);
     return $('<article>').addClass("tweet").append([header, tweetContent, footer]);
   }

   function renderTweets(tweets) {
     for (var tweet in tweets) {
       var tweetElement = createTweetElement(tweets[tweet]);
       $(messageContainer).prepend(tweetElement);
     }
   }

  function loadTweets (){
     $.ajax({
     method: 'get',
     url: '/tweets/',
     //data: $(this).serialize(),
     dataType: 'json',
     success: function(data){
       renderTweets(data);
     }
   });


 }
 loadTweets();

   $('form').on('submit', function(event){
     event.preventDefault();
      var theForm = $(this);

      var tweetLength = $("form > textarea").val().length;

      if (tweetLength  === 0 ) {
       $.flash('Please write a tweet!');
     } else if (tweetLength > 140) {
       $.flash('Tweets MUST be 140 characters!');
     } else {
        $.ajax({
         method: theForm.attr('method'),
         url: theForm.attr('action'),
         data: theForm.serialize(),
         success: function(){
          loadTweets();
         }
       });
       $('textarea').val('')
     }
  });


 });
