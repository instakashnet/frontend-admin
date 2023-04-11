import { useState, useEffect } from 'react'

export const useRole = (user) => {
  const [role, setRole] = useState(null)

  useEffect(() => {
    if (user && user.roles) {
      let roleName = user.roles
      setRole(roleName.replace('ROLE_', '').toLowerCase())
    }
  }, [user])

  return [role]
}
