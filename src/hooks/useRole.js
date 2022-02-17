import { useState, useEffect } from "react";

export const useRole = (user) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user && user.roles) {
      let roleName = user.roles;
      if (user.roles === "ROLE_OPERATOR" || user.roles === "ROLE_ANALYST" || user.roles === "ROLE_SIGNATORY") roleName = "orders";
      if (user.roles === "ROLE_APPRAISER" || user.roles === "ROLE_OFFICER") roleName = "officers";
      setRole(roleName.replace("ROLE_", "").toLowerCase());
    }
  }, [user]);

  return [role];
};
