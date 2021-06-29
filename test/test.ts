import * as utils from "../src";

{
  const arr = ["1", "2", "3", "5", "2", "3"];
  const reduced = utils.array.reduceSameItems(arr, (x) => x);
  console.log("reduceSameItems #1", reduced);
}

{
  const arr = [
    {id: 1, v: "a"},
    {id: 3, v: "c"},
    {id: 4, v: "d"},
    {id: 3, v: "c"},
    {id: 3, v: "c"},
    {id: 2, v: "b"},
    {id: 3, v: "c"},
    {id: 4, v: "d"},
  ];
  const reduced = utils.array.reduceSameItems(arr, (x) => x.id.toString());
  console.log("reduceSameItems #2", reduced);
}

{
  const arr = [
    {id: 1, v: "a"},
    {id: 3, v: "c"},
    {id: 4, v: "d"},
    {id: 3, v: "c"},
    {id: 3, v: "c"},
    {id: 2, v: "b"},
    {id: 3, v: "c"},
    {id: 4, v: "d"},
  ];
  const map = utils.array.toMap(arr, (x) => x.id.toString());
  console.log("toMap", map);

  const multi_map = utils.array.toMultiMap(arr, (x) => x.id.toString());
  console.log("toMultiMap", multi_map);
}


{
  console.log("anyToString", utils.string.anyToString("aaa"));
  console.log("anyToString", utils.string.anyToString(12));
  console.log("anyToString", utils.string.anyToString(null));
  console.log("anyToString", utils.string.anyToString(undefined));
  console.log("anyToString", utils.string.anyToString([1, 2, 3]));
  console.log("anyToString", utils.string.anyToString({id: 1, value: "2"}));
  console.log("anyToString", utils.string.anyToString(new Error("err")));
}

debugger;