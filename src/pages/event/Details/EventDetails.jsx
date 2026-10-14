import React, { lazy, Suspense, useState, useEffect } from 'react';

import { useParams, useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';

import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';

import { APIServices } from '../../../contants/apiConfig';
import { handleTimeFormat } from '../../../contants/contans';

const ViewQR = lazy(() => import('./Modal/ViewQR'));
const FilterTable = lazy(() => import('./Modal/FilterTable'));
const CancelRegistration = lazy(() => import('./Modal/CancelRegistration'));
const ViewUserInfo = lazy(() => import('./Modal/ViewUserInfo'));

const EventDetails = () => {

    const { id } = useParams();


    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);


    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);
    const [openQr, setOpenQr] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);
    const [openView, setOpenView] = useState(false);

    const [selectUser, setSelectUser] = useState(null);
    const [search, setSearch] = useState('');

    const [eventDay, setEventDay] = useState([]);

    const [filter, setFilter] = useState({ status: null, om: null, campaign: null, branch: null, role: null })


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on rowsPerPage change
    };


    const handleEvent = () => {
        navigate("/app/event")
    }

    const handleCloseEvent = () => {
        setOpenFilter(false);
        setOpenQr(false)
        setOpenCancel(false)
        setOpenView(false)
    }

    const handleFetchEvents = async () => {

        let URLQuery = `/day-attendance-table?day_id=${id}&per_page=${rowsPerPage}&page=${page + 1}&name=${search}
        ${filter?.status ? `&status_id=${filter?.status}` : ''}
        ${filter?.om ? `&om_id=${filter?.om}` : ''}
        ${filter?.campaign ? `&campaign_id=${filter?.campaign}` : ''}
        ${filter?.branch ? `&branch_id=${filter?.branch}` : ''}
        ${filter?.role ? `&role=${filter?.role}` : ''}
        `

        const response = await APIServices.get({
            url: URLQuery,
        });

        if (response.status === 200) {
            setEventDay(response?.data);
        }

    }

    const handleViewCancel = (data) => {
        setSelectUser(data)
        setOpenCancel(true)

    }

    const handleViewUser = (data) => {
        setSelectUser(data)
        setOpenView(true)

    }

    const handleVerify = async (data) => {

        const response = await APIServices.post({
            url: `/toggle-day-verified`, payload: {
                "user_id": data?.id,
                "event_day_id": id,
            }
        });

        if (response.status === 200) {
            handleFetchEvents();
        }

    }


    useEffect(() => {
        handleFetchEvents();
    }, [rowsPerPage, page, search, filter]);

    return (
        <div className='w-full'>

            <Suspense>
                {openFilter && <FilterTable openModal={openFilter} handleClose={handleCloseEvent} setFilter={setFilter} filter={filter} />}
            </Suspense>

            <Suspense>
                {openQr && <ViewQR openModal={openQr} handleClose={handleCloseEvent} eventData={eventDay} />}
            </Suspense>

            <Suspense>
                {openCancel && <CancelRegistration openModal={openCancel} handleClose={handleCloseEvent} user_data={selectUser} eventData={eventDay} refreshData={handleFetchEvents} />}
            </Suspense>

            <Suspense>
                {openView && <ViewUserInfo openModal={openView} handleClose={handleCloseEvent} user_data={selectUser} eventData={eventDay} />}
            </Suspense>

            <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-5">

                <div className='flex flex-row items-center gap-2 flex-wrap'>

                    <div onClick={handleEvent} className='p-[2px] rounded-lg border border-[#556fa8] cursor-pointer'>
                        <span className='text-[#556fa8]'><KeyboardDoubleArrowLeftOutlinedIcon /></span>
                    </div>

                    <div className='flex flex-row items-center gap-2 flex-wrap'>

                        <h1 className='font-normal text-lg text-gray-700'>{eventDay?.event?.name} ( Date : {handleTimeFormat(eventDay?.event_day?.event_start)} )</h1>
                        <div className='flex flex-row items-center gap-2 bg-teal-500 rounded p-2 cursor-pointer'>
                            <span className='text-white cursor-pointer'> <CheckCircleIcon sx={{ fontSize: 15 }} /></span>
                            <h1 className='font-normal text-xs text-white'>Pre-registration End : {handleTimeFormat(eventDay?.event?.registration_cutoff)}</h1>
                        </div>

                    </div>


                </div>

                <div className='flex flex-row gap-2 items-center'>
                    <TextField id="outlined-basic" label="Search Employee..." variant="outlined" size='small' onChange={e => setSearch(e.target.value)} />

                    <Tooltip title="Filter Table">
                        <div onClick={e => setOpenFilter(true)} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer'>
                            <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
                        </div>
                    </Tooltip>

                    <Tooltip title="View QR">
                        <div onClick={e => setOpenQr(true)} className='p-[6px] rounded-lg border border-blue-800 bg-blue-500 cursor-pointer'>
                            <span className='text-white'><QrCode2Icon /></span>
                        </div>
                    </Tooltip>

                </div>

            </div>

            <div className="w-full flex flex-wrap items-start gap-4 border-2 border-dashed border-gray-300 p-3 my-2 rounded-lg">


                <div className='flex flex-row items-center justify-center gap-2'>

                    <div className='mt-1'>
                        <span className='text-blue-500'> <CheckCircleIcon sx={{ fontSize: 35 }} /></span>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-sm text-black'>Pre-registration : {eventDay?.status_counts?.pre_registered}</h1>
                        <h1 className='text-[12px] text-gray-600'>Registered before event</h1>
                    </div>

                </div>

                <div className='flex flex-row items-center justify-center gap-2'>

                    <div className='mt-1'>
                        <span className='text-green-500'> <CheckCircleIcon sx={{ fontSize: 35 }} /></span>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-sm text-black'>Showed Up : {eventDay?.status_counts?.attended}</h1>
                        <h1 className='text-[12px] text-gray-600'>Attended the event</h1>
                    </div>

                </div>

                <div className='flex flex-row items-center justify-center gap-2'>

                    <div className='mt-1'>
                        <span className='text-red-500'> <CheckCircleIcon sx={{ fontSize: 35 }} /></span>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-sm text-black'>Late-registration : {eventDay?.status_counts?.late_registered}</h1>
                        <h1 className='text-[12px] text-gray-600'>Pre-registered after cut-off</h1>
                    </div>

                </div>

                <div className='flex flex-row items-center justify-center gap-2'>

                    <div className='mt-1'>
                        <span className='text-yellow-500'> <CheckCircleIcon sx={{ fontSize: 35 }} /></span>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-sm text-black'>Cancelled : {eventDay?.status_counts?.cancelled}</h1>
                        <h1 className='text-[12px] text-gray-600'>Cancelled after registering</h1>
                    </div>

                </div>

            </div>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="medium">
                    <TableHead>
                        <TableRow>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>ID</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Name</h1>
                                </div>

                            </TableCell>


                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Email</h1>
                                </div>

                            </TableCell>


                            {/* <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Branch</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Operation Manager</h1>
                                </div>

                            </TableCell> */}

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Registration</h1>
                                </div>

                            </TableCell>

                            <TableCell>

                                <div className='flex flex-row gap-2 items-center'>
                                    <h1 className='text-[#556fa8] text-sm'>Scan Date/Time</h1>
                                </div>

                            </TableCell>

                            <TableCell>
                                <h1 className='text-[#556fa8] text-sm'>Action</h1>
                            </TableCell>

                        </TableRow>

                    </TableHead>
                    <TableBody>


                        {eventDay?.attendees?.map((row, index) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                key={index}
                            >
                                <TableCell>
                                    <h1 className='text-gray-500 text-xs'>{row?.id}</h1>
                                </TableCell>

                                <TableCell>
                                    <div className='flex flex-row gap-2 items-center'>
                                        {row?.is_verified &&
                                            <Tooltip title="Employee is verified">
                                                <VerifiedOutlinedIcon color="success" />
                                            </Tooltip>
                                        }
                                        <h1 className='text-gray-500 font-semibold text-sm'>{row?.name}</h1>
                                    </div>

                                </TableCell>

                                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    <h1 className='text-gray-500 text-xs'>{row?.email}</h1>
                                </TableCell>

                                {/* <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    <h1 className='text-gray-500 text-xs'>Ecoland</h1>
                                </TableCell>

                                <TableCell>
                                    O.M Tester Ecoland
                                </TableCell> */}

                                <TableCell>

                                    {row?.status_history?.map((status, index) => (

                                        <React.Fragment>


                                            {status?.id === 1 &&

                                                <span className='text-blue-500 cursor-pointer'>
                                                    <Tooltip title="Pre-Registration">
                                                        <CheckCircleIcon />
                                                    </Tooltip>
                                                </span>

                                            }

                                            {status?.id === 2 &&

                                                <span className='text-green-500 cursor-pointer'>
                                                    <Tooltip title="Showed Up">
                                                        <CheckCircleIcon />
                                                    </Tooltip>
                                                </span>

                                            }

                                            {status?.id === 3 &&

                                                <span className='text-red-500 cursor-pointer'>
                                                    <Tooltip title="Late-Registration">
                                                        <CheckCircleIcon />
                                                    </Tooltip>
                                                </span>

                                            }

                                            {status?.id === 4 &&

                                                <span className='text-yellow-500 cursor-pointer'>
                                                    <Tooltip title="Cancelled">
                                                        <CheckCircleIcon />
                                                    </Tooltip>
                                                </span>

                                            }

                                        </React.Fragment>

                                    ))}

                                    {/* <span className='text-red-500 cursor-pointer'>
                                    <Tooltip title="Late-Registration">
                                        <CheckCircleIcon />
                                    </Tooltip>
                                </span> */}

                                </TableCell>

                                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    <h1 className='text-gray-500 text-xs'>{handleTimeFormat(row?.status?.scanned_at)}</h1>
                                </TableCell>


                                <TableCell>

                                    <div className='flex flex-row gap-2'>


                                        {/* <Tooltip title="View Admin">
                                            <div className='cursor-pointer'>
                                                <VisibilityIcon color="primary" />
                                            </div>
                                        </Tooltip> */}

                                        <Tooltip title="View Info">
                                            <div className='cursor-pointer' onClick={e => handleViewUser(row)}>
                                                <VisibilityIcon color="success" />
                                            </div>
                                        </Tooltip>

                                        <Tooltip title="Cancel Registration">
                                            <div className='cursor-pointer' onClick={e => handleViewCancel(row)}>
                                                <DoNotDisturbIcon color="error" />
                                            </div>
                                        </Tooltip>

                                        <Tooltip title={`${row?.is_verified ? "remove employee verification" : "Verify Employee"}`} onClick={e => handleVerify(row)}>
                                            <div className='cursor-pointer'>
                                                {row?.is_verified ? <NewReleasesOutlinedIcon color="info" /> : <VerifiedOutlinedIcon color="success" />}
                                            </div>
                                        </Tooltip>

                                    </div>

                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={eventDay?.pagination?.total || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </TableContainer>

        </div >
    )
}

export default EventDetails