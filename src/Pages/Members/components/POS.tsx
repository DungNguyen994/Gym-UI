import AutoComplete from "../../../Generic Components/Form/AutoComplete";
import Well from "../../../Generic Components/Well";
import { Grid } from "@mui/material";
import { products } from "../../../constants";

export default function POS() {
  return (
    <div className="purchasing-well">
      <Well headerText="POS">
        <Grid container spacing={3}>
          <AutoComplete
            fieldName="product"
            label="Product"
            options={products}
            defaultValue={products[0]}
          />
        </Grid>
      </Well>
    </div>
  );
}
