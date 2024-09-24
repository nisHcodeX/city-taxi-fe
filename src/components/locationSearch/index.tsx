import { TextFields } from "@mui/icons-material";
import { Autocomplete, Box, TextField } from "@mui/material";

interface CountryType {
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
}

const countries: readonly CountryType[] = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
      code: 'AE',
      label: 'United Arab Emirates',
      phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
      code: 'AG',
      label: 'Antigua and Barbuda',
      phone: '1-268',
    },
];

export default function LocationList() {
    <Autocomplete
    id="country-select-demo"
    sx={{ width: 300 }}
    options={countries}
    autoHighlight
    getOptionLabel={(option: any) => option.label}
    renderOption={(props, option) => {
      const { key, ...optionProps } = props;
      return (
        <Box
          key={key}
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...optionProps}
        >
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      );
    }}
    renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
        //   slotProps={{
        //     htmlInput: {
        //       ...params.inputProps,
        //       autoComplete: 'new-password', // disable autocomplete and autofill
        //     },
        //   }}
        />
      )}
  />
};