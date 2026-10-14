import React, { lazy, Suspense, useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import AlarmOffOutlinedIcon from '@mui/icons-material/AlarmOffOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { APIServices } from '../../contants/apiConfig';

import { handleTimeFormat } from '../../contants/contans';

const FilterEvent = lazy(() => import('./Modal/FilterEvent'));
const CreateEvent = lazy(() => import('./Modal/CreateEvent'));
const UpdateEvent = lazy(() => import('./Modal/UpdateEvent'));
const DeleteEvent = lazy(() => import('./Modal/DeleteEvent'));
const ViewEvent = lazy(() => import('./Modal/ViewEvent'));
const ViewQR = lazy(() => import('./Modal/ViewQR'));

const EventPage = () => {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, row) => {
        setSelectedEvent(row ? row : [])
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [modalState, setModalState] = useState({
        create: false,
        update: false,
        filter: false,
        delete: false,
        view: false,
        qr: false,
    });

    const [evenlist, setEvenlist] = useState([]);
    const [selectedQR, setSelectedQR] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        handleFetchEvents();
    }, [search]);

    const handleView = (id) => {
        navigate(`/app/event-detail/${id}`)
    }

    const handleOpenEvent = (type, row = null) => {

        setModalState({
            create: false,
            filter: false,
            update: false,
            delete: false,
            view: false,
            qr: false,
            [type]: true,
        });
    };

    const handleCloseEvent = () => {
        setModalState({
            create: false,
            filter: false,
            delete: false,
            view: false,
            update: false,
            qr: false,
        });
    };


    const handleFetchEvents = async () => {

        const today = new Date();
        today.setDate(today.getDate() - 2);

        const formattedDate = today.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });

        const response = await APIServices.get({
            url: `/events?search=${search}&start_date=${formattedDate}`
        });

        if (response.status === 200) {
            setEvenlist(response?.data?.events);
        }

    }

    const viewQR = async (event, time) => {
        setSelectedQR({
            event: event,
            time: time
        });

        setModalState(prev => ({
            ...prev,
            qr: true,
        }));
    };

    return (
        <div className='w-full'>

            <Suspense>
                {modalState.create && <CreateEvent openModal={modalState.create} handleClose={handleCloseEvent} refreshData={handleFetchEvents} />}
            </Suspense>

            <Suspense>
                {modalState.update && <UpdateEvent openModal={modalState.update} handleClose={handleCloseEvent} refreshData={handleFetchEvents} eventData={selectedEvent} />}
            </Suspense>

            <Suspense>
                {modalState.filter && <FilterEvent openModal={modalState.filter} handleClose={handleCloseEvent} />}
            </Suspense>

            <Suspense>
                {modalState.delete && <DeleteEvent openModal={modalState.delete} handleClose={handleCloseEvent} refreshData={handleFetchEvents} eventData={selectedEvent} />}
            </Suspense>

            <Suspense>
                {modalState.view && <ViewEvent openModal={modalState.view} handleClose={handleCloseEvent} eventData={selectedEvent} />}
            </Suspense>

            <Suspense>
                {modalState.qr && <ViewQR openModal={modalState.qr} handleClose={handleCloseEvent} QR={selectedQR} />}
            </Suspense>



            <div className="w-full flex flex-wrap items-center justify-between gap-2">

                <div className='flex flex-row items-center gap-2'>
                    <h1 className='font-normal text-lg text-gray-700'>Six Eleven Upcoming and Ongoing Events List ( Total Events : {evenlist?.length} )</h1>
                </div>

                <div className='flex flex-row gap-2 items-center'>

                    <TextField id="outlined-basic"
                        label="Search Event..."
                        variant="outlined"
                        size='small'
                        value={search || ''}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Tooltip title="Create Event">
                        <div onClick={e => handleOpenEvent("create")} className='p-[6px] rounded-lg border border-blue-700 bg-blue-500 cursor-pointer'>
                            <span className='text-white'><AddCircleOutlineIcon /></span>
                        </div>
                    </Tooltip>

                    {/* <Tooltip title="Filter Table">
                        <div onClick={e => handleOpenEvent("filter")} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer'>
                            <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
                        </div>
                    </Tooltip> */}

                </div>

            </div>

            <div className="w-full flex flex-wrap items-start gap-4 border-2 border-dashed border-gray-300 p-3 my-2 rounded-lg">

                <div className='flex flex-row items-center justify-center gap-2'>

                    <div className='mt-1'>
                        <h1 className='text-black'><EventAvailableOutlinedIcon sx={{ fontSize: 35, color: '#7C3AED' }} /></h1>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-sm text-black'>Event Start</h1>
                        <h1 className='text-[12px] text-gray-600'>When the event begins</h1>
                    </div>

                </div>


                <div className='flex flex-row items-center justify-center gap-2'>

                    <div className='mt-1'>
                        <h1 className='text-black'><AlarmOffOutlinedIcon sx={{ fontSize: 35, color: '#7C3AED' }} /></h1>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-sm text-black'>Event Registration Cut-off</h1>
                        <h1 className='text-[12px] text-gray-600'>Deadline to register</h1>
                    </div>

                </div>


                <div className='flex flex-row items-center justify-center gap-2'>

                    <div className='mt-1'>
                        <h1 className='text-black'><Groups3OutlinedIcon sx={{ fontSize: 35, color: '#7C3AED' }} /></h1>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-sm text-black'>View Participants</h1>
                        <h1 className='text-[12px] text-gray-600'>See registered participants</h1>
                    </div>

                </div>


                <div className='flex flex-row items-center justify-center gap-2'>

                    <div className='mt-1'>
                        <h1 className='text-black'><QrCode2OutlinedIcon sx={{ fontSize: 35, color: '#7C3AED' }} /></h1>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-sm text-black'>QR Code</h1>
                        <h1 className='text-[12px] text-gray-600'>View Event QR Code s</h1>
                    </div>

                </div>

            </div>

            <div className='w-full flex flex-col my-5'>

                <div className="w-full grid gap-4 items-start justify-start [grid-template-columns:repeat(auto-fit,minmax(250px,345px))]">

                    {
                        evenlist?.map((row, index) => (
                            <Card sx={{ maxWidth: 345 }} key={index}>
                                <div className='relative'>

                                    <CardMedia
                                        component="img"
                                        image={row?.image}
                                        alt="green iguana"
                                        sx={{
                                            width: "100%",
                                            height: 200,
                                            objectFit: "cover",
                                            borderRadius: "8px 8px 0 0",
                                        }}
                                    />
                                    <CardContent>
                                        <div className='w-full flex flex-col gap-[5px]'>

                                            <div className='flex flew-row items-center'>
                                                <h1 className='font-semibold text-lg'>{row?.name}</h1>
                                            </div>

                                            <div className='flex flew-row items-center'>
                                                <h1 className='text-black font-semibold text-sm line-clamp-2'>Description : <span className='font-light'>{row?.description}</span></h1>
                                            </div>

                                            <div className='flex flew-row items-center'>
                                                <h1 className='text-black font-semibold text-sm line-clamp-3'>Instruction : <span className='font-light'>{row?.instruction}</span></h1>
                                            </div>


                                            <div className='flex flew-row items-center'>
                                                <h1 className='text-black font-semibold text-sm line-clamp-3'>Address : <span className='font-light'>{row?.address}</span></h1>
                                            </div>

                                            <div className='flex flex-row items-center justify-between bg-violet-50 rounded-lg p-2'>
                                                <div className='flex flex-row items-center'>
                                                    <h1 className='text-violet-500'><HourglassEmptyOutlinedIcon sx={{ fontSize: 18 }} /></h1>
                                                    <h1 className='font-semibold text-xs text-violet-500 mt-1'>Pre-registration Cut-Off : </h1>
                                                </div>
                                                <h1 className='font-bold text-xs text-violet-500 mt-1'>{handleTimeFormat(row?.registration_cutoff)}</h1>
                                            </div>

                                            <div className='flex flew-row items-center gap-[2px] my-2'>
                                                <h1 className='text-black'><CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} /></h1>
                                                <h1 className='font-semibold text-xs text-black mt-1'>Event Schedule</h1>
                                            </div>


                                            <div className='flex flex-col gap-2 rounded-lg'>

                                                {row?.days?.map((data, index) => (

                                                    <div className='flex flew-row justify-between items-center gap-[3px] p-2 border-2 border-gray-300 rounded-lg' key={index}>

                                                        <div className='flex flex-col w-full'>

                                                            <div className='flex flew-row items-center gap-[2px]'>
                                                                <h1 className='text-black'><EventAvailableOutlinedIcon sx={{ fontSize: 18 }} /></h1>
                                                                <h1 className='font-bold text-xs text-black'>{handleTimeFormat(data?.event_start)}</h1>
                                                            </div>

                                                            {data?.event_cutoff &&

                                                                <div className='flex flew-row items-center gap-[2px]'>
                                                                    <h1 className='text-violet-500 text-xs mt-1'><AlarmOffOutlinedIcon sx={{ fontSize: 18 }} /></h1>
                                                                    <h1 className='font-bold text-xs text-violet-500 mt-1'>{handleTimeFormat(data?.event_cutoff)}</h1>
                                                                </div>
                                                            }

                                                        </div>

                                                        <div className='flex flew-row items-center gap-[5px] cursor-pointer mt-1' >



                                                            <div className='bg-violet-100 rounded-full p-2 flex flex-col items-center justify-center' onClick={e => handleView(data?.id)}>
                                                                <Tooltip title="View Participants">
                                                                    <Groups3OutlinedIcon sx={{ fontSize: 25 }} />
                                                                </Tooltip>
                                                            </div>

                                                            <div className='bg-gray-100 rounded-full p-2 flex flex-col items-center justify-center' onClick={e => viewQR(row, data)}>

                                                                <Tooltip title="View QR">
                                                                    <QrCode2OutlinedIcon sx={{ fontSize: 25 }} />
                                                                </Tooltip>
                                                            </div>


                                                        </div>

                                                    </div>

                                                ))}

                                            </div>

                                            <div className='w-full flex flex-row items-center gap-2 absolute top-2 left-3'>
                                                <Tooltip title="Total Participants">
                                                    <div className='border-[2px] border-white bg-violet-500 rounded-full px-2 text-white font-semibold flex flex-row items-center gap-2 cursor-pointer'>
                                                        <span><Groups2OutlinedIcon /></span>
                                                        <h1 className='text-lg text-white'>{row?.actual_attendees}</h1>
                                                    </div>
                                                </Tooltip>
                                            </div>

                                        </div>

                                    </CardContent>
                                    <CardActions>

                                        <div className='w-full flex flex-row items-center justify-between gap-2 pb-2'>


                                            <div className='flex flex-row items-center justify-center gap-2'>

                                                <div>
                                                    <InfoOutlinedIcon sx={{ fontSize: 15, color: 'gray' }} />
                                                </div>

                                                <h1 className='text-xs text-gray-500 mt-1'>{row?.days?.length} {row?.days?.length > 1 ? "Schedules" : "Schedule"}</h1>

                                            </div>


                                            <div className='flex flex-row items-center justify-end gap-2'>

                                                <div className='cursor-pointer' onClick={e => handleClick(e, row)}>
                                                    <Tooltip title="Action Menu">
                                                        <MoreVertOutlinedIcon sx={{ color: '#7C3AED' }} />
                                                    </Tooltip>
                                                </div>

                                            </div>

                                        </div>

                                    </CardActions>

                                    <Suspense>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >

                                            <MenuItem onClick={e => handleOpenEvent("view", row)}>

                                                <div className='cursor-pointer flex flex-row items-center gap-2'>
                                                    <VisibilityIcon color='info' />
                                                    <span>View Event</span>
                                                </div>

                                            </MenuItem>

                                            <MenuItem onClick={e => handleOpenEvent("update", row)}>

                                                <div className='cursor-pointer flex flex-row items-center gap-2'>
                                                    <EditIcon color='info' />
                                                    <span>Update Event</span>
                                                </div>

                                            </MenuItem>

                                            <MenuItem onClick={e => handleOpenEvent("delete", row)}>

                                                <div className='cursor-pointer flex flex-row items-center gap-2'>
                                                    <DeleteIcon color='info' />
                                                    <span>Delete Event</span>
                                                </div>

                                            </MenuItem>

                                        </Menu>

                                    </Suspense>


                                </div>
                            </Card>

                        ))}

                </div>

            </div>

        </div>
    )
}

export default EventPage