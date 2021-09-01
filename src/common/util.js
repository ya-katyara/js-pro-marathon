/* eslint-disable */
export function clamp(x, from_x, to_x) {
  if (x < from_x) x = from_x;
  if (x > to_x) x = to_x;

  return x;
}

export function animateEx(dx, startTime, currentTime, speed, looped = false) {
  const diff = currentTime - startTime;
  let time = (speed && diff / speed) || 0;

  if (looped) {
    time = time % 1;
  } else if (time > 1) {
    time = 1;
  }

  return { offset: dx * time, progress: time };
}

const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);

export function getTime(date) {
  const convertDate = new Date(date);
  return `${normalize(convertDate.getHours())}:${normalize(convertDate.getMinutes())}:${normalize(
    convertDate.getSeconds(),
  )}`;
}
export function getScrollbarWidth() {

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;

}