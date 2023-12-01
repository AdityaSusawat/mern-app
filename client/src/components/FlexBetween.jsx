import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
  //this allows us to reuse this set of CSS properties anywhere easily
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
