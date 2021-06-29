export function toMap<T>(items: T[] | undefined, fid: (it: T) => string) {
  const result: { [_: string]: T } = {};
  items?.forEach((it) => {
    result[fid(it)] = it;
  });
  return result;
}

export function toMultiMap<T>(
  items: T[] | undefined,
  fid: (it: T) => string
) {
  const result: { [_: string]: T[] } = {};
  items?.forEach((it) => {
    const k = fid(it);
    if (k in result) {
      result[k].push(it);
    } else {
      result[k] = [it];
    }
  });
  return result;
}

export function reduceSameItems<T>(
  items: T[] | undefined,
  fid: (it: T) => string
) {
  const map: { [_: string]: T } = {};
  items?.forEach((it) => {
    map[fid(it)] = it;
  });
  return Object.keys(map).map((k) => map[k]);
}
