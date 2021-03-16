//control dropdown menu
const dropMenu = document.querySelectorAll('.dropdown__menu');
const dropSelect = document.querySelectorAll('.dropdown__select');

dropMenu.forEach((v) =>
  v.addEventListener('click', (e) => {
    const plus = e.target.classList.contains('dropdown__plus');
    const minus = e.target.classList.contains('dropdown__minus');
    const clearBtn = e.currentTarget.querySelector('.dropdown__clear');
    const blockedMinus = e.target.parentNode.querySelector('.dropdown__minus');
    const count = e.target.parentNode.querySelector('.dropdown__count');

    if (plus) {
      if (blockedMinus.classList.contains('dropdown__minus--disabled')) {
        blockedMinus.classList.remove('dropdown__minus--disabled');
      }
      if (clearBtn.classList.contains('dropdown__clear--hidden')) {
        clearBtn.classList.remove('dropdown__clear--hidden');
      }
      count.innerHTML++;

      const allcount = countItems(e);
      return checkIsDefault(e, allcount);
    }
    if (minus) {
      if (!blockedMinus.classList.contains('dropdown__minus--disabled')) {
        count.innerHTML--;
      }
      if (+count.innerHTML === 0) {
        blockedMinus.classList.add('dropdown__minus--disabled');
      }

      const allcount = countItems(e);
      if (allcount === 0) {
        clearBtn.classList.add('dropdown__clear--hidden');
      }
      return checkIsDefault(e, allcount);
    }
    if (e.target.classList.contains('dropdown__clear')) {
      const counts = e.currentTarget.querySelectorAll('.dropdown__count');
      const placeholder = e.currentTarget.previousSibling.querySelector('.dropdown__placeholder');
      const minusBtns = e.currentTarget.querySelectorAll('.dropdown__minus');

      placeholder.innerHTML = e.currentTarget.dataset.startplace;
      counts.forEach((v) => (v.innerHTML = 0));
      minusBtns.forEach((v) => v.classList.add('dropdown__minus--disabled'));
      clearBtn.classList.add('dropdown__clear--hidden');
    }
    if (e.target.classList.contains('dropdown__apply')) {
      dropSelect.forEach((v) => {
        if (v.classList.contains('dropdown__select--open')) {
          v.classList.remove('dropdown__select--open');
          v.nextSibling.classList.remove('dropdown__menu--open');
        }
      });
    }
  })
);

const countItems = (e) =>
  Array.prototype.slice
    .call(e.currentTarget.querySelectorAll('.dropdown__count'))
    .reduce((acc, val) => acc + +val.innerHTML, 0);

const checkIsDefault = (e, allcount) => {
  const isDefault = typeof e.currentTarget.dataset.droptype !== 'undefined';
  return isDefault ? changePlaceholderDefault(e, allcount) : changePlaceholderNotDefault(e, allcount);
};

const changePlaceholderNotDefault = (e, allcount) => {
  const placeholder = e.currentTarget.previousSibling.querySelector('.dropdown__placeholder');

  switch (true) {
    case allcount === 0:
      placeholder.innerHTML = e.currentTarget.dataset.startplace;
      break;
    case allcount === 1:
      placeholder.innerHTML = '1 гость';
      break;
    case allcount < 5:
      placeholder.innerHTML = `${allcount} гостя`;
      break;
    case allcount >= 5:
      placeholder.innerHTML = `${allcount} гостей`;
      break;
  }
};

const changePlaceholderDefault = (e, allcount) => {
  const titles = e.currentTarget.querySelectorAll('.dropdown__item-title');
  const counts = e.currentTarget.querySelectorAll('.dropdown__count');
  const placeholder = e.currentTarget.previousSibling.querySelector('.dropdown__placeholder');
  const arr = [];

  titles.forEach((v, i) => {
    if (counts[i].innerHTML > 0) {
      arr.push(`${counts[i].innerHTML} ${v.innerHTML}`);
    }
  });
  switch (true) {
    case allcount === 0:
      placeholder.innerHTML = e.currentTarget.dataset.startplace;
      break;
    case arr.length === 1:
      placeholder.innerHTML = arr.join(', ');
      break;
    case arr.length === 2:
      placeholder.innerHTML = arr.slice(0, 2).join(', ');
      break;
    case arr.length > 2:
      placeholder.innerHTML = arr.slice(0, 2).join(', ') + '...';
      break;
  }
};

//open&close dropdown
dropSelect.forEach((v) => {
  v.addEventListener('click', (e) => {
    const isOpened = e.currentTarget.classList.contains('dropdown__select--open');

    dropSelect.forEach((v) => {
      v.classList.remove('dropdown__select--open');
      v.nextSibling.classList.remove('dropdown__menu--open');
    });

    if (!isOpened) {
      e.currentTarget.classList.add('dropdown__select--open');
      e.currentTarget.nextSibling.classList.add('dropdown__menu--open');
    } else {
      e.currentTarget.classList.remove('dropdown__select--open');
      e.currentTarget.nextSibling.classList.remove('dropdown__menu--open');
    }
  });
});

//close outside dropdown
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    dropSelect.forEach((v) => {
      if (v.classList.contains('dropdown__select--open')) {
        v.classList.remove('dropdown__select--open');
        v.nextSibling.classList.remove('dropdown__menu--open');
      }
    });
  }
});
