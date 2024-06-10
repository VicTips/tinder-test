export const parseFirebaseTimestamp = (createdAt: any) => {
  const unfDate = new Date(
    createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
  );
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
  };
  const day: number = unfDate.getDate();
  const month: string = new Intl.DateTimeFormat("en-US", options)
    .format(unfDate)
    .toLowerCase();

  return `${day} ${month}`;
};
