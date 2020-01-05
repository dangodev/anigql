/**
 * Limit depth of any object by key name (ex: limitDepth(myObj, {foo: 3, bar: 5}) limits “foo” to 3 nested occurrences and “bar” to 5 nested occurrences)
 * @param  {any} obj
 * @param  {{[index:string]:number}} depth
 */
export default function limitDepth(obj: any, depth: { [index: string]: number }) {
  const count: { [index: string]: number } = {};

  return JSON.parse(
    JSON.stringify(obj, (name, value) => {
      if (typeof count[name] !== 'number') {
        count[name] = 0;
      }
      count[name] += 1;
      const max = depth[name] >= 0 ? depth[name] : Infinity;
      if (count[name] <= max) {
        if (typeof value === 'object') {
          return Array.isArray(value) ? [...value] : { ...value };
        }
        return value;
      }
      return undefined;
    })
  );
}
