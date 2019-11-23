import { Individual } from '../types';

export function pointCrossover(
  a: Individual,
  b: Individual,
  i: number = Math.floor(Math.random() * a.length),
) {
  const m = a.slice(0, i) + b.slice(i);
  const n = b.slice(0, i) + a.slice(i);
  return [m, n];
}

export function uniquePointCrossover(
  a: Individual,
  b: Individual,
  i = Math.floor(Math.random() * a.length),
) {
  let m = a.slice(0, i);
  let p = i;
  while (m.length < a.length) {
    if (m.indexOf(b[p]) === -1) {
      m += b[p];
    } else {
      p += 1;
      if (p === i) {
        break;
      }

      if (p === a.length) {
        p = 0;
      }
    }
  }

  let n = b.slice(0, i);
  let q = i;
  while (n.length < b.length) {
    if (n.indexOf(a[q]) === -1) {
      n += a[q];
    } else {
      q += 1;
      if (q === i) {
        break;
      }
      if (q === b.length) {
        q = 0;
      }
    }
  }
  return [m, n];
}
