import React, { useState } from 'react'

import { format } from 'date-fns';

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';

import UpdateButton from '../../../component/Button/UpdateButton';
import CloseButton from '../../../component/Button/CloseButton';

import { APIServices } from '../../../contants/apiConfig';


const UpdateAds = ({ openModal, handleClose, refreshData, eventData }) => {

    const [imgFile, setImgFile] = useState(null);
    const [isloading, setIsLoading] = useState(false)


    const [form, setForm] = useState({
        name: eventData?.file_name,
        description: eventData?.description,
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

    const handleAddAds = async () => {

        setIsLoading(true)

        const formData = new FormData();
        formData.append('id', eventData?.id);
        formData.append('file_name', form.name);
        formData.append('description', form.description);

        if (imgFile) {
            formData.append('file', imgFile);
        }


        try {

            const response = await APIServices.post({
                url: '/ads/update', payload: formData
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

            <div className='max-w-[600px] max-h-[750px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Update Ads</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xs text-[#839f55] font-bold'>File Name</h1>
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
                        <h1 className='text-xs text-[#839f55] font-bold'>File Description</h1>
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

                    <Box sx={{ mb: 2 }}>


                        {eventData && imgFile === null ?
                            <div className='flex flex-row gap-2 relative w-full overscroll-x-none overflow-x-hidden'>
                                <img src={import.meta.env.VITE_API_URL + eventData?.file_url} alt="preview" className="max-w-[200px] max-h-[200px] w-full h-auto rounded" />
                            </div>
                            : null}


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

                        <UpdateButton btnTxt={"Update Ads"} handleClick={handleAddAds} isLoading={isloading} />
                        <CloseButton btnTxt={"Close"} handleClick={handleClose} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default UpdateAds;