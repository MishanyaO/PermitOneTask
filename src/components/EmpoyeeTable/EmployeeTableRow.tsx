import { IconButton, TableCell, TableRow, Tooltip, Zoom } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { EmployeeLineItem } from "../../interfaces/employees";

interface EmployeeTableRowProps {
  employee: EmployeeLineItem;
  handleEditEmployee: (employee: EmployeeLineItem) => void;
}

export const EmployeeTableRow = ({
  employee,
  handleEditEmployee,
}: EmployeeTableRowProps) => {
  // destructure to improve readability
  const { name, email, phone, occupation } = employee;

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{occupation}</TableCell>
      <TableCell>
        <Tooltip placement="top" title="Edit" TransitionComponent={Zoom}>
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleEditEmployee(employee)}
          >
            <EditIcon
              sx={{
                fontSize: "1.1rem",
              }}
            />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
