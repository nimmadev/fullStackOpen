export const isNotNumber = (value: unknown): boolean => {
  return (
    typeof value !== "string" ||
    value.trim() === "" ||
    Number.isNaN(Number(value))
  );
};
