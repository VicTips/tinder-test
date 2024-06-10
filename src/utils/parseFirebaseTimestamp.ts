export const parseFirebaseTimestamp = (createdAt: any) => {
  new Date(
    createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
  ).toDateString();
};
