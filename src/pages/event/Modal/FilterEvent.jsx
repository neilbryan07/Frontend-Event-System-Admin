import React, { useState } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import SubmitButton from '../../../component/Button/SubmitButton';
import CloseButton from '../../../component/Button/CloseButton';


const FilterEvent = ({ openModal, handleClose }) => {

    const [imgDescription, setImgDescription] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null)

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] max-h-[200px] h-full w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Filter Event</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by branch:</h1>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                        >
                            <MenuItem value={0}>MAA</MenuItem>

                        </Select>
                    </FormControl>

                    <div className='w-full flex flex-row justify-end gap-2 mt-2'>

                        <SubmitButton btnTxt={"Filter"} handleClick={handleClose} />
                        <CloseButton btnTxt={"Close"} handleClick={handleClose} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default FilterEvent;