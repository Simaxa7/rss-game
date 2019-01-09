const arrayRandomNumber = arr => Math.floor(Math.random() * arr.length);

const arrRandName = arr => arr[Math.floor(Math.random() * arr.length)];

const pushLocalStorage = (location, obj) => {
  const oldResults = JSON.parse(localStorage.getItem(location)) || [];
  oldResults.push(obj);

  oldResults.sort((a, b) => b.result - a.result);
  localStorage.setItem(location, JSON.stringify(oldResults));
};

export {
  arrayRandomNumber,
  arrRandName,
  pushLocalStorage,
};
