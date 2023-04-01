import React, { useEffect } from "react";
import { Box, Button, TextField, FormControl, FormLabel, Typography } from "@mui/material";

import { Web3 } from "services/web3/v1";
import { ERCStandardContract } from "types";

import { APP_URL, SUPPORTED_CONTRACTS } from "utils/constants";

const formStyle = {
  display: "flex",
  flexDirection: "column",
};


const { REACT_APP_ENVIRONMENT: APP_ENV } = process.env;

function CreateContractForm() {
  const [contractType, setContractType] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [symbol, setSymbol] = React.useState<string>("");
  const [selectedContract, setSelectedContract] = React.useState<ERCStandardContract>({});

  const onChangeText = (textField: string, input: string) => {
    switch (textField) {
      case "symbol":
        setSymbol(input);
        break;
      case "name":
        setName(input);
        break;
    }
  };

  // const onValidate = (textField: string): boolean => {
  //   switch (textField) {
  //     case "address":
  //       return (member.address as string).length === 42 && (member.address as string).slice(0, 2) === "0x";
  //     break;
  //     case "name":
  //       return name !== "";
  //     break;
  //     default:
  //       return true
  //   }
  // }


  const deployERCStandardContract = async () => {

    try {
      const web3 = await Web3.getInstance();
      const contract = await web3.deployContractV1(
        name,
        symbol,
        0.00018
      );
      if (APP_ENV === "development") {
        window.open(contract.url, "_blank");
      }
      callbackAfterDeployOrgContract(contract.address);
    } catch (error: unknown) {
      throw new Error(
        "Possible RPC Error: Metamask Tx Signature: User denied transaction signature"
      );
    }
  };

  const callbackAfterDeployOrgContract = (address: string) => {
    // Using this way to navigate loads Members and Balances when a deployment is success.
    // window.open(`http://localhost:3000/org/${address}`)
    const url = `${APP_URL}/org/${address}`;
    window.open(url);
  };

  const onSubmit = async () => {
    deployERCStandardContract();
  };

  const componentDidMount = () => {
    if (APP_ENV === "development") {
      // setName("TestUiOrg");
      // setMember({
      //   address: "0x3D694A1C605e014b195FaA913e090e4BB9544FE3",
      //   amount: 0.00018,
      // });
      // setMembers(mockMembers);
    }
  };

  useEffect(componentDidMount, []);

  const SelectContractButtons = () => {
    return(
     <Box sx={formStyle}>
      {
        SUPPORTED_CONTRACTS.map((contract, index) => {
          return (
            <>
              <Button
                key={index}
                variant="contained"
                color="primary"
                sx={{ width: 350 }}
                onClick={()=>{
                  setContractType(contract.type)
                  setSelectedContract(contract)
                }}
              >
                {contract.name}
              </Button>
              <br/>
            </>
          )
        })
      }
     </Box> 
    )
  } 

  return (
    <Box sx={formStyle}>
      <Box>
        <Typography variant="h4" component="h4" align="center">
          Select a Contract
        </Typography>
      </Box>
      {/* Form */}
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >

        <SelectContractButtons />
        { 
        selectedContract.name ? (
        <Box>
          <Typography variant="h6" component="h4">
            Selected Contract {selectedContract.name}
          </Typography>
        </Box>
        ) : "" 
        }
        <Box sx={formStyle}>
          <FormControl>
            <FormLabel>Contract Name</FormLabel>
            <br />
            <TextField
              label="Contract Name"
              variant="outlined"
              onChange={(event) => onChangeText("name", event.target.value)}
              required={true}
              value={name}
              sx={{ width: 350 }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contract Symbol</FormLabel>
            <br />
            <TextField
              label="Contract Symbol"
              variant="outlined"
              onChange={(event) => onChangeText("symbol", event.target.value)}
              required={true}
              value={symbol}
              sx={{ width: 350 }}
            />
          </FormControl>
          <br />
          {/* Submit */}
          <FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: 350 }}
            >
              Deploy { contractType} Contract 
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateContractForm;
