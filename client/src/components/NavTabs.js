import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GoodsList from '../pages/Goods/GoodsList';
import WarehouseList from '../pages/Warehouse/WarehouseList';
import InvoceInList from '../pages/InvoceIn/InvoceInList';
import { Card, CardContent, Link, Typography } from '@mui/material';
import { GOODS_ROUTE } from '../utils/consts';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Справочники" {...a11yProps(0)} />
          <Tab label="Продажи" {...a11yProps(1)} />
          <Tab label="Реализация" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
              <Typography variant="h6" component="div">
                <Link href="#" underline="hover">
                  Компании
                </Link>
              </Typography>
              <Typography variant="h6" component="div">
                <Link href="#" underline="hover">
                  Склады
                </Link>
              </Typography>
              <Typography variant="h6" component="div">
                  <Link href={GOODS_ROUTE} underline="hover">
                    Товары
                  </Link>
              </Typography>
              <Typography variant="h6" component="div">
                <Link href="#" underline="hover">
                  Партнеры
                </Link>
              </Typography>
              <Typography variant="h6" component="div">
                <Link href="#" underline="hover">
                  Договора
                </Link>
              </Typography>
            </CardContent>
        </Card>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <WarehouseList />  
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <InvoceInList />
      </CustomTabPanel>
    </Box>
  );
}