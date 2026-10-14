import React, { useState } from 'react'

import { format } from 'date-fns';

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import CreateButton from '../../../component/Button/CreateButton';
import CloseButton from '../../../component/Button/CloseButton';

import { APIServices } from '../../../contants/apiConfig';


const CreateEvent = ({ openModal, handleClose, refreshData }) => {

    const [imgFile, setImgFile] = useState(null);
    const [preregister, setPreregister] = useState(null)
    const [isloading, setIsLoading] = useState(false)

    const [eventDates, setEventDates] = useState([
        {
            event_start: null,
            event_cutoff: null,
            is_event_cutoff: false,
        }
    ]);

    const handleToggleCutoff = (index, value = true) => {
        const updated = [...eventDates];

        updated[index].is_event_cutoff = value;

        if (!value) {
            updated[index].event_cutoff = null;
        }

        setEventDates(updated);
    };

    const addEventDate = () => {
        setEventDates([
            ...eventDates,
            { event_start: null, event_cutoff: null }
        ]);
    };

    const removeEventDate = (index) => {
        const updated = eventDates.filter((_, i) => i !== index);
        setEventDates(updated);
    };

    const handleDateChange = (index, field, value) => {
        const updated = [...eventDates];
        updated[index][field] = value;
        setEventDates(updated);
    };


    const [form, setForm] = useState({
        name: "",
        description: "",
        instruction: "",
        address: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
    };

    const handleAddEvent = async () => {

        setIsLoading(true)

        const formattedDates = eventDates.map(item => ({
            event_start: item.event_start
                ? format(new Date(item.event_start), "yyyy-MM-dd HH:mm:ss")
                : null,

            event_cutoff: item.event_cutoff
                ? format(new Date(item.event_cutoff), "yyyy-MM-dd HH:mm:ss")
                : null,
        }));

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('instruction', form.instruction);
        formData.append('address', form.address);
        formData.append('registration_cutoff', format(new Date(preregister), "yyyy-MM-dd HH:mm:ss"));
        formData.append("days", JSON.stringify(formattedDates));

        formData.append('image', imgFile);

        try {

            const response = await APIServices.post({
                url: '/events/create', payload: formData
            });

            if (response.status === 200) {
                refreshData();
                handleClose();
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            handleClose();
        }

    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[700px] max-h-[750px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Create Event</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Event Name</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Event Description</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Event Intructions</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="instruction"
                            value={form.instruction}
                            onChange={handleChange}
                            multiline
                            rows={3}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>Event Address</h1>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            multiline
                            rows={2}
                        />
                    </div>

                    <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Pre-registration Cut-Off Date:</h1>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker
                                    label="Date & Time"
                                    orientation="landscape"
                                    slotProps={{ textField: { size: 'small' } }}
                                    value={preregister}
                                    onChange={(newValue) => setPreregister(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>

                    </FormControl>

                    <div className='w-full flex flex-row items-center justify-end my-2 '>
                        <CreateButton btnTxt={"Add More Event dates"} handleClick={addEventDate} />
                    </div>

                    {eventDates.map((item, index) => (
                        <div
                            key={index}
                            className='w-full flex flex-row items-center justify-between gap-2 mb-3'
                        >
                            <FormControl fullWidth>
                                <h1 className='text-xs text-[#839f55] font-bold mb-2'>
                                    Event Date:
                                </h1>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Date & Time"
                                        orientation="landscape"
                                        slotProps={{ textField: { size: 'small' } }}
                                        value={item.event_start}
                                        onChange={(newValue) =>
                                            handleDateChange(index, "event_start", newValue)
                                        }
                                    />
                                </LocalizationProvider>
                            </FormControl>

                            <FormControl fullWidth>
                                <h1 className='text-xs text-[#839f55] font-bold mb-2'>
                                    Registration Cut-off:
                                </h1>

                                {!item.is_event_cutoff ? (

                                    <button
                                        type="button"
                                        onClick={() => handleToggleCutoff(index, true)}
                                        className="border border-[#839f55] text-[#839f55] text-xs py-2 rounded hover:bg-[#839f55] hover:text-white transition"
                                    >
                                        + Add Registration Cut-off
                                    </button>
                                ) : (
                                    // 👉 Show picker if enabled
                                    <div className="flex flex-col gap-2">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                label="Date & Time"
                                                orientation="landscape"
                                                slotProps={{ textField: { size: 'small' } }}
                                                value={item.event_cutoff}
                                                onChange={(newValue) =>
                                                    handleDateChange(index, "event_cutoff", newValue)
                                                }
                                            />
                                        </LocalizationProvider>

                                        {/* <button
                                            type="button"
                                            onClick={() => handleToggleCutoff(index, false)}
                                            className="text-red-500 text-xs text-left"
                                        >
                                            Remove cut-off
                                        </button> */}
                                    </div>
                                )}
                            </FormControl>

                            <div onClick={() => removeEventDate(index)} className='flex flex-col items-center justify-center mt-5 cursor-pointer'>
                                <Tooltip title="Remove events date">
                                    <CancelOutlinedIcon color='error' />
                                </Tooltip>
                            </div>

                        </div>
                    ))}

                    <Box sx={{ mb: 2 }}>
                        {imgFile &&
                            <div className='flex flex-col gap-2 relative w-full overscroll-x-none overflow-x-hidden'>
                                <img src={URL.createObjectURL(imgFile)} alt="preview" className="max-w-[200px] max-h-[200px] w-full h-auto rounded" />
                                <h1 className='text-sm text-[#839f55] font-bold w-[400px] text-wrap'>{imgFile.name}</h1>
                                <Tooltip title="Remove Uploaded Picture">
                                    <div onClick={e => setImgFile(null)} className='absolute cursor-pointer right-1 bg-white rounded-full p-1 items-center flex flex-col top-1'>
                                        <CancelIcon color='error' />
                                    </div>
                                </Tooltip>
                            </div>
                        }
                    </Box>

                    <div className='max-w-[300px] gap-2 flex flex-col'>
                        <h1 className='text-xs text-red-500 font-bold'>File size should be less than 10mb</h1>
                        <Button variant="contained" component="label" sx={{ mb: 2 }} color="success">
                            <h1 className='text-sm text-white font-light'>Upload Image File</h1>
                            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                        </Button>
                    </div>

                    <div className='w-full flex flex-row justify-end gap-2 mt-2'>

                        <CreateButton btnTxt={"Create Event"} handleClick={handleAddEvent} isLoading={isloading} />
                        <CloseButton btnTxt={"Close"} handleClick={handleClose} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default CreateEvent;