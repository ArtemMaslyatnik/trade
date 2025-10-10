import * as React from 'react';
import { useGridApiContext } from '@mui/x-data-grid';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

import { fetch as fetchGoods } from '../../service/GoodsService';



const Goods = React.memo(function Goods(props) {
  const { value } = props;
  return (
         <Box component="span" >
        {value.name}
      </Box>
  );
});

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  height: '100%',
  [`& .${autocompleteClasses.inputRoot}`]: {
    ...theme.typography.body2,
    padding: '1px 0',
    height: '100%',
    '& input': {
      padding: '0 16px',
      height: '100%',
    },
  },
}));

function EditGoods(props) {
    const [goodsItems, setGoods] = React.useState([]);
    React.useEffect(() => {
        fetchGoods().then(data => setGoods(data))
        }, [])
    const { id, value, field } = props;

    const apiRef = useGridApiContext();

    const handleChange = React.useCallback(
        async (event, newValue) => {
        await apiRef.current.setEditCellValue({ id, field, value: newValue }, event);
        apiRef.current.stopCellEditMode({ id, field });
        },
        [apiRef, field, id],
    );

    return (
        <StyledAutocomplete
        value={value}
        onChange={handleChange}
        options={goodsItems}
        getOptionLabel={(option) => option.name}
        //getOptionLabel={(option) => option.lable}
        autoHighlight
        fullWidth
        open
        //disableClearable
        renderOption={(optionProps, option) => (
            <Box
            component="li"
            {...optionProps}
            key={option.id}
            >
            {/* {option.label} */}
            {option.name} 
            </Box>
        )}
        renderInput={(params) => (
            <InputBase
            autoFocus
            fullWidth
            id={params.id}
            inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            {...params.InputProps}
            />
        )}
        />
    );
}

export function renderGoods(params) {
  if (params.value == null) {
    return '';
  }

  return <Goods value={params.value} />;
}

export function renderEditGoods(params) {
  return <EditGoods {...params} />;
}
