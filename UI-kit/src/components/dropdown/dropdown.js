//control dropdown menu
const dropMenu = document.querySelectorAll('.dropdown__menu');

dropMenu.forEach((v) =>
  v.addEventListener('click', (e) => {
    const plus = e.target.classList.contains('dropdown__plus');
    const minus = e.target.classList.contains('dropdown__minus');
    const blockedMinus = e.target.parentNode.querySelector('.dropdown__minus');
    const count = e.target.parentNode.querySelector('.dropdown__count');
    if (plus) {
      if (blockedMinus.classList.contains('dropdown__minus_disabled')) {
        blockedMinus.classList.remove('dropdown__minus_disabled');
      }
      count.innerHTML++;
      changePlaceholder(e);
    }
    if (minus) {
      if (!blockedMinus.classList.contains('dropdown__minus_disabled')) {
        count.innerHTML--;
      }
      if (+count.innerHTML === 0) {
        blockedMinus.classList.add('dropdown__minus_disabled');
      }
    }
  })
);

const changePlaceholder = (e) => {
  const type = typeof e.currentTarget.dataset.droptype !== 'undefined';
  const placeholder = e.currentTarget.previousSibling.querySelector('.dropdown__placeholder');
  const allcount = Array.prototype.slice
    .call(e.currentTarget.querySelectorAll('.dropdown__count'))
    .reduce((acc, val) => acc + +val.innerHTML, 0);

  console.log(placeholder);

  if (type) {
    switch (allcount) {
      case 1:
        placeholder.innerHTML = '1 гость';
        break;
      //попробуй this
    }
  }
};
