

    
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { SxProps, useFormControl } from '@mui/material';

import {Controller, useFormContext} from 'react-hook-form'
//https://mui.com/x/react-date-pickers/getting-started/
//https://mui.com/x/react-date-pickers/date-picker/ 
// using destok time picker

interface IDatePicker {
    name: string;
    size?: "small" | "medium";
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: SxProps;
  }
const PHDatePicker  = ({name,size,label,required, fullWidth=true,sx}:IDatePicker) => {

    /*<LocalizationProvider dateAdapter={AdapterDayjs}>
 
          <DesktopDatePicker defaultValue={dayjs(new Date().toDateString())} />
       
        </LocalizationProvider> */

       const {control}=useFormContext();
    return (
         <Controller
         name={name}
         control={control}
         defaultValue={dayjs(new Date().toDateString())}
        
         render={({field:{onChange,value,...field}})=>{
            return <LocalizationProvider dateAdapter={AdapterDayjs}>
 
            <DesktopDatePicker  label={label}   timezone="system"
              disablePast {...field} onChange={(date)=>onChange(date)} value={value || Date.now() }   slotProps={{
                textField: {
                  required: required,
                  size: size,
                  sx: {
                    ...sx,
                  },
                  variant: "outlined",
                  fullWidth: fullWidth,
                },
              }} />
         
          </LocalizationProvider>
         }}
         
         />
    );
};

export default PHDatePicker ;