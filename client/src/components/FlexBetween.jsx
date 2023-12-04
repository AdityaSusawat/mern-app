import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
  //Styled function takes another component (Box in this case) and applies the provided CSS properties
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}); //this allows us to reuse this set of CSS properties anywhere easily

export default FlexBetween;
