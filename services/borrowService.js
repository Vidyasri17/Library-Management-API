export const canMemberBorrow = (borrowCount, hasUnpaidFine) => {
  if (borrowCount >= 3) return false;
  if (hasUnpaidFine) return false;
  return true;
};
