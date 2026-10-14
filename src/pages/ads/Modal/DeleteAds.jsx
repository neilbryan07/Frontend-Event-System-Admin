import React, { useState } from 'react'

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import DeleteButton from '../../../component/Button/DeleteButton';
import CloseButton from '../../../component/Button/CloseButton';

import { APIServices } from '../../../contants/apiConfig';

const DeleteAds = ({ openModal, handleClose, refreshData, adsData }) => {

    const [imgDescription, setImgDescription] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null)

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
    };

    const handleDeleteAds = async () => {

        const response = await APIServices.post({
            url: `/ads/delete`, payload: {
                "id": adsData?.id
            }
        });

        if (response.status === 200) {
            refreshData();
            handleClose();
        } else {
        }
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Delete Event : {adsData?.file_name}</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    <div className='w-full flex flex-col items-start gap-2'>
                        <h1 className='font-semibold text-sm text-black'>File Description : </h1>
                        <h1 className='font-light text-sm text-black'>{adsData?.description}</h1>
                    </div>


                    <div className='w-full flex flex-row items-center justify-center'>

                        <img src={import.meta.env.VITE_API_URL + adsData?.file_url} alt="preview" className="max-w-[450px] max-h-[450px] rounded" />

                    </div>

                    <div className='w-full flex flex-row justify-end gap-2 mt-2'>

                        <DeleteButton btnTxt={"Delete Ads"} handleClick={handleDeleteAds} />
                        <CloseButton btnTxt={"Close"} handleClick={handleClose} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default DeleteAds;