import { Autocomplete, TextField } from '@mui/material';
import { GridRenderEditCellParams } from '@mui/x-data-grid';
import { name } from 'dayjs/locale/ru';

const AutocompleteEditInput =(GridRenderEditCellParams) => {
      const { id, field, value, api, options, row } = GridRenderEditCellParams;

      const handleChange = (event, newValue) => {
        api.setEditCellValue({ id, field, value: newValue });
      };
      console.log(GridRenderEditCellParams);
      return (
        <Autocomplete
            sx={{ width: 300}}
            getOptionLabel={(option) => option.name || ""}
            value={row.goods}
            onChange={handleChange}
            options={options} // Pass your autocomplete options here
            renderInput={(params) => <TextField {...params} />}
        />
      );
}
export default AutocompleteEditInput;