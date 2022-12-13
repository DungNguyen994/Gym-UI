import { Grid } from "@mui/material";
import AutoComplete from "../../Generic Components/Form/AutoComplete";
import TextInput from "../../Generic Components/Form/TextInput";

export default function StockInForm() {
  return (
    <Grid container direction="row">
      <AutoComplete
        label="Product"
        fieldName="product"
        options={[]}
        md={12}
        lg={12}
      />
      <TextInput label="Quantity" fieldName="quantity" md={12} lg={12} />
    </Grid>
  );
}
