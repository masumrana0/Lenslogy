import { IRole } from "../_interface/user.interface";

export const availableRoles = (currentUserRole: IRole) => {
  if (currentUserRole === "SUPER_ADMIN") {
    return ["SUPER_ADMIN", "ADMIN", "AUTHOR"];
  } else if (currentUserRole === "ADMIN") {
    return ["AUTHOR"];
  } else {
    return [];
  }
};
