$(document).ready(function() {
    var personalTweetTextArea = $('#personal-tweet');
    var charCount = $('#char-count');
    var tweetButton = $('#tweet-submit');
    var mainFeed = $('#stream');

    // Show count and button
    personalTweetTextArea.focus(function(event) {
        $(this).css('height', '5em');
        charCount.removeClass('initial-hide');
        tweetButton.removeClass('initial-hide');
    });

    // User Typing
    personalTweetTextArea.on('keyup', function(event) {
        var personalTweetContent = personalTweetTextArea.val().length;
        var total = 140 - personalTweetContent;

        charCount.text(total);

        if (total <= 0) {
            charCount.addClass('warning-color');
            tweetButton.prop("disabled", true);
        } else {
            charCount.removeClass('warning-color');
            tweetButton.prop("disabled", false);
        }
    });



    // Add tweet to Feed
    tweetButton.on('click', function(event) {
        event.preventDefault();
        addTweet(personalTweetTextArea.val());
        personalTweetTextArea.val('');
        personalTweetTextArea.css('height', '2.5em');
        charCount.text('140')
    });

    function addTweet(text) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var theDate = new Date();
        var hour = theDate.getHours();
        var amPM = 'AM';
        if (hour == 0) { //At 00 hours we need to show 12 am
            hour = 12;
        } else if (hour > 12) {
            hour = hour % 12;
            amPM = 'PM';
        }
        var time = hour + ":" + theDate.getMinutes() + ' ' + amPM;
        var day = theDate.getDate();
        var month = months[theDate.getMonth()];
        var year = theDate.getFullYear().toString().slice(2);
        var date = day + ' ' + month + ' ' + year;
        var dateText = time + ' - ' + date;
        mainFeed.prepend(
            '<div class="tweet">' +
            '<div class="content">' +
            '<img class="avatar" src="img/alagoon.jpg" />' +
            '<strong class="fullname">The Guy</strong>' +
            '<span class="username">@theguy</span>' +
            '<p class="tweet-text">' + text + '</p>' +
            '<div class="tweet-actions">' +
            '<ul>' +
            '<li><span class="icon action-reply"></span> Reply</li>' +
            '<li><span class="icon action-retweet"></span> Retweet</li>' +
            '<li><span class="icon action-favorite"></span> Favorite</li>' +
            '<li><span class="icon action-more"></span> More</li>' +
            '</ul>' +
            '</div>' +
            '<div class="stats">' +
            '<div class="retweets">' +
            '<p class="num-retweets">0</p>' +
            '<p>RETWEETS</p>' +
            '</div>' +
            '<div class="favorites">' +
            '<p class="num-favorites">0</p>' +
            '<p>FAVORITES</p>' +
            '</div>' +
            '<div class="users-interact">' +
            '<div>' +
            '<img src="img/alagoon.jpg" />' +
            '<img src="img/vklimenko.jpg" />' +
            '</div>' +
            '</div>' +
            '<div class="time">' +
            dateText +
            '</div>' +
            '</div>' +
            '<div class="reply">' +
            '<img class="avatar" src="img/alagoon.jpg" />' +
            '<textarea class="tweet-compose" placeholder="Reply to @mybff"/></textarea>' +
            '</div>' +
            '</div>' +
            '</div>'
        );

    }

    //Hover and click tweet
    $(document).on({
        mouseenter: function() {
            event.preventDefault();
            $(this).find('.tweet-actions').css('visibility', 'visible');
        },
        mouseleave: function() {
            event.preventDefault();
            $(this).find('.tweet-actions').css('visibility', 'hidden');
        }
    }, '.tweet');

    $(document).on('click', '.tweet', function(event) {
        event.preventDefault();
        $(this).find('.stats').slideDown('fast');
        $(this).find('.reply').slideDown('fast');
    });
});
