
import { Box, Button, Container, FormGroup, MenuItem, Select,} from '@mui/material';
import { useState } from 'react';

const Report = () => {
 
    const companyItems = []
    const [item, setItem] = useState()

    return (
        <Container className="mt-3">
            <Box>

                <Button variant="contained">
                    Сформировать
                </Button >
                <hr></hr>
                <FormGroup className="mb-3">
                   <Select 
                        // value={item.company}
                        // onChange={(event)  => setItem({...item, company: event.target.value})}
                        >
                            {companyItems.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormGroup>
            </Box>
        </Container>
    );
};

export default Report;