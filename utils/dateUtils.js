export const getBorrowDate = () => {
  return new Date();
};

export const getDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 14); // 14 days loan
  return date;
};
