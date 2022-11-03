import { Cancel, Search } from "@mui/icons-material";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { SHOW_OPTIONS } from "../../../constants";
import AutoComplete from "../../../Generic Components/Form/AutoComplete";
import { getMembers } from "../../../Redux-toolkit/features/Members/memberSlice";
import { useAppSelector } from "../../../Redux-toolkit/hooks";

interface Inputs {
  search: string;
  show: string;
}
export default function Header() {
  const methods = useForm<Inputs>({
    defaultValues: { show: "active" },
  });
  const { register, watch, reset } = methods;
  const members = useAppSelector(getMembers);
  const totalMembers = members?.length || 0;
  return (
    <div className="member-list-header">
      <h1 className="header-text">Member List</h1>
      <Stack className="search" component="form" spacing={3}>
        <FormProvider {...methods}>
          <TextField
            {...register("search")}
            label="Search"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  {!watch("search") ? (
                    <Search />
                  ) : (
                    <Cancel
                      onClick={() => reset()}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <AutoComplete
            fieldName="show"
            label="Show"
            options={SHOW_OPTIONS}
            defaultValue={SHOW_OPTIONS[0]}
          />
        </FormProvider>
        <Typography color="maroon" sx={{ fontSize: "18px" }}>
          Total Members: {totalMembers}
        </Typography>
      </Stack>
    </div>
  );
}
