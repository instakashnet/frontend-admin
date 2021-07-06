import { useState, useEffect } from "react";

export const useRole = (user) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user && user.role) {
      let roleName = user.role;
      if (user.role === "ROLE_OPERATOR" || user.role === "ROLE_ANALYST" || user.role === "ROLE_SIGNATORY") roleName = "orders";
      if (user.role === "ROLE_APPRAISER" || user.role === "ROLE_OFFICER") roleName = "officers";
      setRole(roleName.replace("ROLE_", "").toLowerCase());
    }
  }, [user]);

  return [role];
};
