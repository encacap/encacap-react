const swapTableOrderByIndex = <T = unknown>(input: T[], from: number, to: number): T[] => {
  const output = [...input];
  const temp = input[from];

  output[from] = input[to];
  output[to] = temp;

  return output;
};

const swapTableOrder = <T = unknown>(arr: T[], from: unknown, to: unknown): T[] => {
  const fromIndex = arr.findIndex((item) => item === from);
  const toIndex = arr.findIndex((item) => item === to);
  return swapTableOrderByIndex(arr, fromIndex, toIndex);
};

const moveTableItemByIndex = <T = unknown>(input: T[], from: number, to: number): T[] => {
  const output = [...input];
  const temp = output[from];

  output.splice(from, 1);
  output.splice(to, 0, temp);

  return output;
};

const moveTableItem = <T = unknown>(arr: T[], from: unknown, to: unknown): T[] => {
  const fromIndex = arr.findIndex((item) => item === from);
  const toIndex = arr.findIndex((item) => item === to);

  return moveTableItemByIndex(arr, fromIndex, toIndex);
};

export { moveTableItem, swapTableOrder, swapTableOrderByIndex };
