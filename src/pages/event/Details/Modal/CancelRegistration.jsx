import React, { useState } from 'react'

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import DeleteButton from '../../../../component/Button/DeleteButton';
import CloseButton from '../../../../component/Button/CloseButton';

import { APIServices } from '../../../../contants/apiConfig';
const CancelRegistration = ({ openModal, handleClose, user_data, eventData, refreshData }) => {

    const handleCancelRegistration = async () => {

        try {

            const response = await APIServices.post({
                url: '/cancel-registration', payload: {
                    "event_id": eventData?.event?.id,
                    "user_id": user_data?.id
                }
            });

            if (response.status === 200) {
                refreshData();
                handleClose();
            } else {

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

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Cancel {user_data?.name} Registration</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    <div className='w-full flex flex-row justify-end gap-2 mt-2'>

                        <DeleteButton btnTxt={"Proceed Cancellation"} handleClick={handleCancelRegistration} />
                        <CloseButton btnTxt={"Close"} handleClick={handleClose} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default CancelRegistration;