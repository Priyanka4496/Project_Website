const correctAnswer = ["D", "B", "C", "B", "D", "B", "B", "D", "D", "D"];

const quizForm = document.querySelector(".quiz-form");
const questions = document.querySelectorAll('.question')
const result = document.querySelector('.result')



quizForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let score = 0

  const userAnswers = [
    quizForm.q1.value, 
    quizForm.q2.value, 
    quizForm.q3.value, 
    quizForm.q4.value, 
    quizForm.q5.value, 
    quizForm.q6.value,
    quizForm.q7.value,
    quizForm.q8.value,
    quizForm.q9.value,
    quizForm.q10.value,
  ]; // how to not use an array over here 

  userAnswers.forEach(function(answer , index){
  if(answer===correctAnswer[index])
  {
    score++
    questions[index].classList.add('correct')
  }
  else
  {
    questions[index].classList.add('wrong')
  }
 })

 result.classList.remove('hide')

 result.querySelector('.score-result').innerText = `Final Scored ${score}/10`

});

// Comment Box

// Get elements
const commentInput = document.getElementById('commentInput');
const submitComment = document.getElementById('submitComment');
const commentsContainer = document.getElementById('commentsContainer');

// Function to create a new comment
function createComment(text) {
    const comment = document.createElement('div');
    comment.classList.add('comment');

    const commentText = document.createElement('p');
    commentText.textContent = text;

    const replyBtn = document.createElement('button');
    replyBtn.classList.add('replyBtn');
    replyBtn.textContent = 'Reply';

    const replyInput = document.createElement('textarea');
    replyInput.classList.add('replyInput');
    replyInput.placeholder = 'Write a reply ...';

    const repliesContainer = document.createElement('div');
    repliesContainer.classList.add('repliesContainer');

    // Event listener for the Reply button
    replyBtn.addEventListener('click', () => {
        // Toggle reply input visibility
        repliesContainer.classList.toggle('showReply');
    });

    // Append elements to the comment
    comment.appendChild(commentText);
    comment.appendChild(replyBtn);
    comment.appendChild(replyInput);
    comment.appendChild(repliesContainer);

    // Append comment to the comments container
    commentsContainer.appendChild(comment);
}

// Event listener for the Submit Comment button
submitComment.addEventListener('click', () => {
    const commentText = commentInput.value.trim();

    if (commentText !== '') {
        // Create and display new comment
        createComment(commentText);
        commentInput.value = ''; // Clear the input field
    }
});

// Optional: Allow pressing Enter to submit a comment
commentInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitComment.click();
    }
});

// Star Rating

/***
 *
 * 1. Get all the stars
 * 2. add a click event on each star
 * 3. when the star is clicked
 *  a. get the data-attribute of the star
 *  b. update the rating based on the data-attribute
 * c. update the stars based on the rating - change the colors of the stars
 */

const stars = document.querySelectorAll('.star');
const rating = document.querySelector('#rating');

stars.forEach(function(star) {
    star.addEventListener('click', function() {
        const value = parseInt(star.getAttribute('data-value'));
        updateRating(value);
    });
});

function updateRating(value) {
    stars.forEach(function(star) {
        const starValue = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('filled', starValue <= value); // Add 'filled' class when condition met
    });

    rating.innerText = value; // Update the rating display
}
