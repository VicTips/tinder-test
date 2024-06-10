export const parseFirebaseTimestamp = (createdAt: any) => {
  return new Date(
    createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
  ).toLocaleDateString("en-US", { day: "numeric", month: "long" });
};
