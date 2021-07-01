import { useState, useEffect } from "react";

export const useRole = (user) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user && user.role) {
      const roleName = user.role === "ROLE_OPERATOR" || user.role === "ROLE_ANALYST" || user.role === "ROLE_SIGNATORY" || user.role === "ROLE_OFFICER" ? "orders" : user.role;
      setRole(roleName.replace("ROLE_", "").toLowerCase());
    }
  }, [user]);

  return [role];
};
