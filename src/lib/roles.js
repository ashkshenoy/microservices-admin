export const isOwner = (user) => user?.role === "owner";
export const isAdmin = (user) =>
  user?.role === "admin" || user?.role === "owner";
export const canEdit = (user) => isAdmin(user);
export const canDelete = (user) => isAdmin(user);
