export const getUniqueObjArray = (array: any[], key: string) => [
  ...new Map(array.map((item) => [item[key], item])).values(),
];
