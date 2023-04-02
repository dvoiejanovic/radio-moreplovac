export const formatYear = (date: string | undefined) => {
  if (!date) {
    return '';
  }

  return date.slice(0, 4);
}
