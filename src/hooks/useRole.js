import { useEffect, useState } from "react";

const useRole = (email) => {
  const [role, setRole] = useState("");
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8000/user/role/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRole(data.role);
          setIsRoleLoading(false);
        });
    }
  }, [email]);
  return [role, isRoleLoading];
};

export default useRole;
