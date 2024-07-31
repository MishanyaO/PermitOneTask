import { useFormik } from "formik";
import * as yup from "yup";
import { Grid, TextField, Button } from "@mui/material";
import { EmployeeLineItem } from "../../interfaces/employees";

interface EmployeeFormProps {
  loading: boolean;
  employee: EmployeeLineItem;
  handleSubmit: (employee: EmployeeLineItem) => Promise<void>;
}
// utility type to reuse EmployeeLineItem and exclude fields, which are not filled by user
type FormValues = Omit<EmployeeLineItem, "created" | "id">;

// move it outside component as constant
const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.date().required(),
  occupation: yup.string().required(),
});

export const EmployeeForm = ({
  loading,
  employee,
  handleSubmit,
}: EmployeeFormProps) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      occupation: employee.occupation,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      // spread values
      await handleSubmit({ ...employee, ...values });
    },
  });
  // to avoid duplication create separate component
  const renderTextField = (field: keyof FormValues, label: string) => (
    <Grid item xs={6} sm={6}>
      <TextField
        id={field}
        name={field}
        label={label}
        fullWidth
        disabled={loading}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[field]}
        error={formik.touched[field] && Boolean(formik.errors[field])}
        helperText={formik.touched[field] && formik.errors[field]}
      />
    </Grid>
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        {renderTextField("name", "Name")}
        {renderTextField("email", "Email")}
        {renderTextField("phone", "Phone")}
        {renderTextField("occupation", "Occupation")}
        <Grid item xs={6} sm={6} />
        <Grid
          item
          xs={12}
          sm={12}
          // important! is a bad practice and better to avoid
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button
            type="submit"
            disabled={formik.isSubmitting || loading}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
