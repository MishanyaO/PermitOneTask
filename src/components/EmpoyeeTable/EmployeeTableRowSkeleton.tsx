import { Button, Skeleton, TableCell, TableRow } from "@mui/material";

// a lot of duplication can be replaced with SkeletonCell
const SkeletonCell = () => (
  <TableCell>
    <Skeleton animation="wave" />
  </TableCell>
);

export const EmployeeTableRowSkeleton = () => {
  return (
    <TableRow>
      <SkeletonCell />
      <SkeletonCell />
      <SkeletonCell />
      <SkeletonCell />
      <TableCell>
        <Skeleton animation="wave" variant="rounded">
          <Button color="primary" size="large" />
        </Skeleton>
      </TableCell>
    </TableRow>
  );
};
