import React, { useState } from 'react'

import Tooltip from '@mui/material/Tooltip';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import AlarmOffOutlinedIcon from '@mui/icons-material/AlarmOffOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';


import CloseButton from '../../../component/Button/CloseButton';

import { handleTimeFormat } from '../../../contants/contans';

const ViewAds = ({ openModal, handleClose, eventData }) => {

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] max-h-[700px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <div className='w-full flex flex-row items-center gap-2'>
                        <h1 className='text-sm text-[#556fa8] font-medium'>View Ads : {eventData?.file_name}</h1>
                    </div>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    <div className='w-full flex flex-col items-start gap-2'>
                        <h1 className='font-semibold text-sm text-black'>File Description : </h1>
                        <h1 className='font-light text-sm text-black'>{eventData?.description}</h1>
                    </div>

                    <div className='self-center my-3'>
                        <img src={import.meta.env.VITE_API_URL + eventData?.file_url} alt="preview" className="max-w-[450px] max-h-[450px] rounded" />
                    </div>

                </div>

                <div className='w-full flex flex-row justify-end gap-2 mt-2'>

                    <CloseButton btnTxt={"Close"} handleClick={handleClose} />

                </div>

            </div>

        </Backdrop>
    )
}

export default ViewAds;