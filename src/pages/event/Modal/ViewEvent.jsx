import React, { useState } from 'react'

import { useNavigate } from "react-router-dom";

import Tooltip from '@mui/material/Tooltip';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import AlarmOffOutlinedIcon from '@mui/icons-material/AlarmOffOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';

import VisibilityIcon from '@mui/icons-material/Visibility';


import CloseButton from '../../../component/Button/CloseButton';

import { handleTimeFormat } from '../../../contants/contans';

const ViewEvent = ({ openModal, handleClose, eventData }) => {

    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/app/event-detail/${id}`)
    }

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] max-h-[700px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <div className='w-full flex flex-row items-center gap-2'>
                        <h1 className='text-sm text-[#556fa8] font-medium'>View Event</h1>

                        <div className='flex flex-row items-center gap-2'>
                            <Tooltip title="Total Participants">
                                <div className='border-[2px] border-white bg-violet-500 rounded-full px-2 text-white font-semibold flex flex-row items-center gap-2 cursor-pointer'>
                                    <span><Groups2OutlinedIcon /></span>
                                    <h1 className='text-lg text-white'>{eventData?.actual_attendees}</h1>
                                </div>
                            </Tooltip>
                        </div>
                    </div>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    <div className='w-full flex flex-row items-center gap-2'>
                        <h1 className='font-semibold text-sm text-black'>Event Name : </h1>
                        <h1 className='font-light text-sm text-black'>{eventData?.name}</h1>
                    </div>

                    <div className='w-full flex flex-col items-start gap-2'>
                        <h1 className='font-semibold text-sm text-black'>Event Description : </h1>
                        <h1 className='font-light text-sm text-black'>{eventData?.description}</h1>
                    </div>

                    <div className='w-full flex  flex-col items-start gap-2'>
                        <h1 className='font-semibold text-sm text-black'>Event Instruction : </h1>
                        <h1 className='font-light text-sm text-black'>{eventData?.instruction}</h1>
                    </div>

                    <div className='w-full flex flex-col items-start gap-2'>
                        <h1 className='font-semibold text-sm text-black'>Event Address : </h1>
                        <h1 className='font-light text-sm text-black'>{eventData?.address}</h1>
                    </div>

                    <div className='flex flew-row items-center gap-[3px]'>
                        <h1 className='text-violet-500'><HourglassEmptyOutlinedIcon sx={{ fontSize: 18 }} /></h1>
                        <h1 className='font-semibold text-sm text-violet-500 mt-1'>Pre-registration Cut-Off : {handleTimeFormat(eventData?.registration_cutoff)}</h1>
                    </div>


                    {eventData?.days?.map((data, index) => (

                        <div className='flex flew-row justify-between items-center gap-[3px] p-2 border-2 border-gray-300 rounded-lg' key={index}>

                            <div className='flex flex-col'>
                                <div className='flex flew-row items-center gap-[2px]'>
                                    <h1 className='text-black'><CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} /></h1>
                                    <h1 className='font-semibold text-xs text-black mt-1'>Event Date : {handleTimeFormat(data?.event_start)}</h1>
                                </div>
                                <div className='flex flew-row items-center gap-[3px]'>
                                    <h1 className='text-violet-500'><AlarmOffOutlinedIcon sx={{ fontSize: 18 }} /></h1>
                                    <h1 className='font-semibold text-xs text-violet-500 mt-1'>Cut-Off : {handleTimeFormat(data?.event_cutoff)}</h1>
                                </div>
                            </div>

                            <div onClick={e => handleView(data?.id)} className='cursor-pointer'>

                                <Tooltip title="View Event">
                                    <VisibilityIcon color='success' />
                                </Tooltip>

                                {/* <img src={`${import.meta.env.VITE_API_URL}/api/event-qr/${data?.id}`} alt="svg" className='w-[50px] h-[50px] cursor-pointer' /> */}
                            </div>

                        </div>

                    ))}

                    <div className='self-center my-3'>
                        <img class="default_logo lazyloaded" src={`${eventData?.image}`} alt="six-eleven-center-logo" data-ll-status="loaded" />
                    </div>





                </div>

                <div className='w-full flex flex-row justify-end gap-2 mt-2'>

                    <CloseButton btnTxt={"Close"} handleClick={handleClose} />

                </div>

            </div>

        </Backdrop>
    )
}

export default ViewEvent;