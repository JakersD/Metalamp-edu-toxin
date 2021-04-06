const likeBtns = document.querySelectorAll('.like__btn');

likeBtns.forEach((v) => {
  v.addEventListener('click', (e) => {
    const likeBtn = e.target.closest('.like__btn');
    likeBtn.classList.toggle('like__btn--active');
    if (likeBtn.classList.contains('like__btn--active')) {
      likeBtn.querySelector('.like__counter').innerHTML++;
    } else {
      likeBtn.querySelector('.like__counter').innerHTML--;
    }
  });
});
