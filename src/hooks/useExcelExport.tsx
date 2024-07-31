import { useState } from "react";
import { EmployeeLineItem } from "../interfaces/employees";
import { sleep } from "../utils/sleep";
import { writeEmployeesToExcel } from "../utils/excel";

export const useExcelExport = () => {
  // deleted type annotation because of Typescript's type inference
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportExployees = async (
    employees: EmployeeLineItem[]
  ): Promise<void> => {
    setIsExporting(true);
    try {
      await writeEmployeesToExcel(employees);
      await sleep(2000);
      return;
    } catch (e: any) {
      setError("Could not export employees");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportExployees,
    isExporting,
    error,
  };
};
