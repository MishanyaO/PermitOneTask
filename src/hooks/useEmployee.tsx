import { useState, useEffect } from "react";
import { EmployeeLineItem } from "../interfaces/employees";
import { sleep } from "../utils/sleep";

export const useEmployee = () => {
  const [employees, setEmployees] = useState<EmployeeLineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // naming changed to clarify what function does
  const fetchEmployees = async (): Promise<void> => {
    try {
      await sleep(2000);
      // here we should set employees, but here its always empty. So, we should not use setEmployees again, because it's empty array already
      // and we can delete this line, but I comment it
      // setEmployees([]);
    } catch (e: any) {
      setError("Could not list employees");
    } finally {
      setIsLoading(false);
    }
  };

  // create and update functions have a lot of duplication code and we can make 1 common function
  const modifyEmployee = async (
    employee: EmployeeLineItem,
    action: "create" | "edit"
  ): Promise<void> => {
    setIsLoading(true);
    try {
      await sleep(2000);
      if (action === "create") {
        setEmployees([...employees, { ...employee }]);
      } else if (action === "edit") {
        // use functional update to ensure the latest state of employees
        setEmployees((prev) => [
          employee,
          ...prev.filter((el) => el.id !== employee.id),
        ]);
      }
    } catch {
      setError(
        action === "create"
          ? "Could not create employee"
          : "Could not update employee"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    modifyEmployee,
    isLoading,
    error,
  };
};
