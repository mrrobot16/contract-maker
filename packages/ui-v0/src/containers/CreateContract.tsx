import React from "react";
import { Container, Box, Typography } from "@mui/material";

import { CreateContractForm } from "components";

function CreateContract() {
  return (
    <Container maxWidth="md">
      <Box>
        <Typography variant="h1" component="h1" align="center">
          Create a Contract
        </Typography>
      </Box>
      <CreateContractForm />
    </Container>
  );
}

export default CreateContract;
