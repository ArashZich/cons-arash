export const calculateRemainingDays = (expiredAt: string) => {
  const currentDate = new Date();
  const expirationDate = new Date(expiredAt);
  const differenceInTime = expirationDate.getTime() - currentDate.getTime();
  if (differenceInTime < 0) {
    return 0; // Return zero if the expiration date has passed
  }
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};
