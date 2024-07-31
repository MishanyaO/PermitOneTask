import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Typography,
} from "@mui/material";
import { EmployeeTableRow } from "./EmployeeTableRow";
import { EmployeeTableRowSkeleton } from "./EmployeeTableRowSkeleton";
import { NoRows } from "./NoRows";
import { EmployeeLineItem } from "../../interfaces/employees";

interface EmployeeTableProps {
  loading: boolean;
  employees: EmployeeLineItem[];
  handleEditEmployee: (employee: EmployeeLineItem) => void;
}

// separate functions to improve readability and avoid duplications + key for mapping
const renderTableHeader = () => (
  <TableRow>
    {["Name", "Email", "Phone", "Occupation", "Actions"].map((header) => (
      <TableCell key={header}>
        <Typography variant="overline" sx={{ fontWeight: 900 }}>
          {header}
        </Typography>
      </TableCell>
    ))}
  </TableRow>
);

const renderTableBody = (
  loading: boolean,
  employees: EmployeeLineItem[],
  handleEditEmployee: (employee: EmployeeLineItem) => void
) => {
  if (loading) {
    return Array.from({ length: 10 }, (_, index) => (
      // usage of index for key is a bad practice, in this case there is no option
      <EmployeeTableRowSkeleton key={index} />
    ));
  }

  if (!employees.length) {
    return <NoRows title={"Employees"} />;
  }

  return employees.map((employee) => (
    <EmployeeTableRow
      key={employee.id}
      employee={employee}
      handleEditEmployee={handleEditEmployee}
    />
  ));
};

export const EmployeeTable = ({
  loading,
  employees,
  handleEditEmployee,
}: EmployeeTableProps) => {
  return (
    <Grid item xs={12} md={12}>
      <Table>
        <TableHead>{renderTableHeader()}</TableHead>
        <TableBody>
          {renderTableBody(loading, employees, handleEditEmployee)}
        </TableBody>
      </Table>
    </Grid>
  );
};
