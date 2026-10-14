import React, { useState } from 'react'

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import DeleteButton from '../../../../component/Button/DeleteButton';
import CloseButton from '../../../../component/Button/CloseButton';

import { APIServices } from '../../../../contants/apiConfig';

import { handleTimeFormat } from '../../../../contants/contans';

const ViewUserInfo = ({ openModal, handleClose, user_data, eventData }) => {

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[400px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>View User</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    <div className='w-full flex flex-row gap-2 items-center'>
                        <h1 className='text-sm text-green-600 font-medium'>Name : </h1>
                        <h1 className='text-sm text-[#556fa8] font-medium'>{user_data?.name}</h1>
                    </div>

                    <div className='w-full flex flex-row gap-2 items-center'>
                        <h1 className='text-sm text-green-600 font-medium'>Gender : </h1>
                        <h1 className='text-sm text-[#556fa8] font-medium'>{user_data?.gender}</h1>
                    </div>

                    <div className='w-full flex flex-row gap-2 items-center'>
                        <h1 className='text-sm text-green-600 font-medium'>Email : </h1>
                        <h1 className='text-sm text-[#556fa8] font-medium'>{user_data?.email}</h1>
                    </div>

                    <div className='w-full flex flex-row gap-2 items-center'>
                        <h1 className='text-sm text-green-600 font-medium'>Contact Number : </h1>
                        <h1 className='text-sm text-[#556fa8] font-medium'>{user_data?.contact_number}</h1>
                    </div>

                    <div className='w-full flex flex-row gap-2 items-center'>
                        <h1 className='text-sm text-green-600 font-medium'>User Type : </h1>
                        <h1 className='text-sm text-[#556fa8] font-medium'>{user_data?.role?.name}</h1>
                    </div>

                    <div className='w-full flex flex-row gap-2 items-center'>
                        <h1 className='text-sm text-green-600 font-medium'>Campaign : </h1>
                        <h1 className='text-sm text-[#556fa8] font-medium'>{user_data?.campaign?.name}</h1>
                    </div>


                    <div className='w-full flex flex-row gap-2 items-center'>
                        <h1 className='text-sm text-green-600 font-medium'>Branch : </h1>
                        <h1 className='text-sm text-[#556fa8] font-medium'>{user_data?.branch?.name}</h1>
                    </div>

                    <div className='w-full flex flex-row gap-2 items-center'>
                        <h1 className='text-sm text-green-600 font-medium'>Company Information : </h1>
                        <h1 className='text-sm text-[#556fa8] font-medium'>{user_data?.company_information}</h1>
                    </div>


                    <div className='w-full flex flex-col'>
                        <h1 className='text-sm text-green-600 font-medium mb-2'>Status History : </h1>
                        {user_data?.status_history?.map((row, index) => (
                            <div className='flex flex-row gap-2 items-center'>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{row?.name} : </h1>
                                <h1 className='text-sm text-[#556fa8] font-medium'>{handleTimeFormat(row?.scanned_at)}</h1>
                            </div>
                        ))}
                    </div>


                    <div className='w-full flex flex-row justify-end gap-2 mt-2'>

                        <CloseButton btnTxt={"Close"} handleClick={handleClose} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default ViewUserInfo;