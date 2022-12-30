import {
  AttachMoney,
  Badge,
  Category,
  Discount,
  PrecisionManufacturing,
} from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import { PRODUCT_TYPES } from "../../constants";
import AutoComplete from "../../Generic Components/Form/AutoComplete";
import TextInput from "../../Generic Components/Form/TextInput";
import { useFormContext } from "react-hook-form";

export default function Information() {
  const {
    formState: { isDirty },
    reset,
  } = useFormContext();
  return (
    <Stack p={1}>
      <h1 style={{ marginBottom: "10px" }}>Product Details</h1>
      <Grid container spacing={4}>
        <AutoComplete
          label="Product Type"
          prefix={<Category />}
          fieldName="productType"
          options={PRODUCT_TYPES}
          defaultValue={PRODUCT_TYPES[0]}
          lg={12}
          md={12}
        />
        <TextInput
          label="Product Name"
          prefix={<Badge />}
          fieldName="productName"
          required
          lg={12}
          md={12}
        />
        <TextInput
          label="Unit Price"
          prefix={<AttachMoney />}
          fieldName="unitPrice"
          required
          lg={12}
          md={12}
        />
        <TextInput
          label="Discount Percentage"
          prefix={<Discount />}
          fieldName="discountPercent"
          type="number"
          lg={12}
          md={12}
        />
        <TextInput
          label="Supplier"
          prefix={<PrecisionManufacturing />}
          fieldName="supplier"
          lg={12}
          md={12}
        />
      </Grid>
      <Stack className="edit-btn" spacing={2} direction="row-reverse" mt={2}>
        <Button
          variant="contained"
          color="warning"
          type="submit"
          disabled={!isDirty}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => reset()}
          disabled={!isDirty}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
}
