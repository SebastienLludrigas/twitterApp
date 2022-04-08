window.addEventListener('DOMContentLoaded', function() {
   bindTweet();
});

function bindTweet() {
   const elements = document.querySelectorAll('.btn-danger');
   const tweetContainer = document.querySelector('#tweet-list-container');
   
   elements.forEach((el) => {
      el.addEventListener('click', (evt) => {
         const tweetId = evt.target.getAttribute('tweetid');
         axios
            .delete(`/tweets/${tweetId}`)
            .then((response) => {
               tweetContainer.innerHTML = response.data;
               bindTweet();
            })
            .catch((err) => console.log(err));
      });
   });
};