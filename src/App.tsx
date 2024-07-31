import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { EmployeeTable } from "./components/EmpoyeeTable/EmployeeTable";
import { EmployeeLineItem } from "./interfaces/employees";
import { useEmployee } from "./hooks/useEmployee";
import EmployeeModal from "./components/EmployeeModal/EmployeeModal";
import { writeEmployeesToExcel } from "./utils/excel";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    //initial type and value
    useState<EmployeeLineItem | undefined>(undefined);
  const { employees, modifyEmployee, isLoading } = useEmployee();

  // separate functions to encapsulate logic from rendering
  const handleExport = async () => {
    if (employees.length) {
      // one extra-call deleted
      await writeEmployeesToExcel(employees);
    } else {
      alert("No employees to export");
    }
  };

  const handleAdd = () => {
    setSelectedEmployee(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (employee: EmployeeLineItem): void => {
    setIsModalOpen(true);
    setSelectedEmployee(employee);
  };

  const handleClose = (): void => {
    setIsModalOpen(false);
    setSelectedEmployee(undefined);
  };

  // function removed from modal to simplify and remove unnecessary props
  const handleModalSubmit = async (
    employee: EmployeeLineItem
  ): Promise<void> => {
    if (selectedEmployee) {
      await modifyEmployee(employee, "edit");
    } else {
      await modifyEmployee(employee, "create");
    }
    handleClose();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Social Pro Tech Task</Typography>
        <Box>
          <Button
            color="primary"
            sx={{ marginRight: 1 }}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button color="primary" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Box>
      <EmployeeTable
        loading={isLoading}
        employees={employees}
        handleEditEmployee={handleEdit}
      />
      {isModalOpen && (
        <EmployeeModal
          loading={isLoading}
          handleClose={handleClose}
          existingEmployee={selectedEmployee}
          handleSubmit={handleModalSubmit}
        />
      )}
    </Box>
  );
}

export default App;
