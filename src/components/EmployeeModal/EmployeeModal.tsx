import { Dialog, DialogContent } from "@mui/material";
import {
  createDefaultEmployee,
  EmployeeLineItem,
} from "../../interfaces/employees";
import { EmployeeForm } from "./EmployeeModalForm";

interface EmployeeModalProps {
  loading: boolean;
  existingEmployee?: EmployeeLineItem;
  handleSubmit: (employee: EmployeeLineItem) => Promise<void>;
  handleClose: () => void;
}

export default function EmployeeModal({
  loading,
  existingEmployee,
  handleClose,
  handleSubmit,
}: EmployeeModalProps) {
  return (
    <Dialog fullWidth open onClose={handleClose}>
      <DialogContent>
        <EmployeeForm
          loading={loading}
          employee={existingEmployee || createDefaultEmployee()}
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
