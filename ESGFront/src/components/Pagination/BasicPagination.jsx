import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({ currentPage, totalPages, onChange }) {
  return (
    <Stack spacing={2} alignItems="center" marginTop={4}>
      <Pagination
        page={currentPage}
        count={Math.min(totalPages,10)}
        size="large"
        color="primary"
        onChange={(event, value) => onChange(value)}
      />
    </Stack>
  );
}
