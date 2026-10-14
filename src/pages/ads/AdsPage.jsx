import React, { lazy, Suspense, useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { APIServices } from '../../contants/apiConfig';

const FilterEvent = lazy(() => import('../event/Modal/FilterEvent'));
const UpdateAds = lazy(() => import('./Modal/UpdateAds'));
const CreateAds = lazy(() => import('./Modal/CreateAds'));
const DeleteAds = lazy(() => import('./Modal/DeleteAds'));
const ViewAds = lazy(() => import('./Modal/ViewAds'));

const AdsPage = () => {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [adslist, setAdslist] = useState([]);
    const [search, setSearch] = useState('');

    const [modalState, setModalState] = useState({
        view: false,
        update: false,
        filter: false,
        create: false,
        delete: false,
    });

    const handleClick = (row) => {
        setSelectedEvent(row ? row : [])
        setModalState(prev => ({
            ...prev,
            view: true,
        }));
    };

    const handleClickDelete = (row) => {
        setSelectedEvent(row ? row : [])
        setModalState(prev => ({
            ...prev,
            delete: true,
        }));
    };

    const handleClickUpdate = (row) => {
        setSelectedEvent(row ? row : [])
        setModalState(prev => ({
            ...prev,
            update: true,
        }));
    };

    const handleCloseEvent = () => {
        setModalState({
            filter: false,
            view: false,
            create: false,
            delete: false,
            update: false,
        });
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        handleFetchEvents();
    }, [rowsPerPage, page, search]);


    const handleFetchEvents = async () => {

        const response = await APIServices.get({
            url: `/ads/show`
        });

        if (response.status === 200) {
            setAdslist(response?.data);
        }

    }


    return (
        <div className='w-full'>

            <Suspense>
                {modalState.filter && <FilterEvent openModal={modalState.filter} handleClose={handleCloseEvent} />}
            </Suspense>

            <Suspense>
                {modalState.view && <ViewAds openModal={modalState.view} handleClose={handleCloseEvent} eventData={selectedEvent} />}
            </Suspense>


            <Suspense>
                {modalState.create && <CreateAds openModal={modalState.create} handleClose={handleCloseEvent} refreshData={handleFetchEvents} />}
            </Suspense>

            <Suspense>
                {modalState.update && <UpdateAds openModal={modalState.update} handleClose={handleCloseEvent} refreshData={handleFetchEvents} eventData={selectedEvent} />}
            </Suspense>

            <Suspense>
                {modalState.delete && <DeleteAds openModal={modalState.delete} handleClose={handleCloseEvent} refreshData={handleFetchEvents} adsData={selectedEvent} />}
            </Suspense>



            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row items-center gap-2'>
                    <h1 className='font-normal text-lg text-gray-700'>Six Eleven Ads Table</h1>
                </div>

                <div className='flex flex-row gap-2 items-center'>
                    <TextField id="outlined-basic" label="Search Event..." variant="outlined" size='small' onChange={(e) => setSearch(e.target.value)} />

                    <Tooltip title="Create Event">
                        <div onClick={e => setModalState(prev => ({ ...prev, create: true, }))} className='p-[6px] rounded-lg border border-blue-700 bg-blue-500 cursor-pointer'>
                            <span className='text-white'><AddCircleOutlineIcon /></span>
                        </div>
                    </Tooltip>

                    <Tooltip title="Filter Table">
                        <div onClick={e => setModalState(prev => ({ ...prev, filter: true, }))} className='p-[6px] rounded-lg border border-[#839f55] cursor-pointer'>
                            <span className='text-[#839f55]'><SettingsOutlinedIcon /></span>
                        </div>
                    </Tooltip>

                </div>

            </div>

            <div className='w-full flex flex-col max-h-[800px] overscroll-y-auto overflow-y-auto p-1 my-5'>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="medium">
                        <TableHead>
                            <TableRow>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-xs'>ID</h1>
                                    </div>

                                </TableCell>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-xs'>File Name</h1>
                                    </div>

                                </TableCell>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-xs'>File Description</h1>
                                    </div>

                                </TableCell>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-xs'>File Img</h1>
                                    </div>

                                </TableCell>

                                <TableCell>
                                    <h1 className='text-[#556fa8] text-xs text-center'>Action</h1>
                                </TableCell>


                            </TableRow>

                        </TableHead>

                        <TableBody>
                            {adslist?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: row?.for_manual_checking ? '#f2ffe6' : 'white' }}
                                >
                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-semibold'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-bold'>{row?.file_name}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-bold'>{row?.description}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <img src={import.meta.env.VITE_API_URL + row?.file_url} alt="preview" className="max-w-[100px] max-h-[100px] rounded" />
                                    </TableCell>

                                    <TableCell sx={{ maxWidth: '100px' }}>

                                        <div className='flex flex-row gap-2 items-center justify-center'>

                                            <div className='flex flex-row items-center justify-center gap-2 cursor-pointer' onClick={e => handleClick(row)}>
                                                <Tooltip title="View Ads">
                                                    <VisibilityIcon color='success' />
                                                </Tooltip>
                                            </div>
                                            <div className='flex flex-row items-center justify-center gap-2 cursor-pointer' onClick={e => handleClickUpdate(row)}>
                                                <Tooltip title="Update Ads">
                                                    <EditOutlinedIcon color='info' />
                                                </Tooltip>
                                            </div>
                                            <div className='flex flex-row items-center justify-center gap-2 cursor-pointer' onClick={e => handleClickDelete(row)}>
                                                <Tooltip title="Delete Ads">
                                                    <DeleteOutlineOutlinedIcon color='error' />
                                                </Tooltip>
                                            </div>

                                        </div>

                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={adslist?.pagination?.total || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}


                </TableContainer>


            </div>

        </div>
    )
}

export default AdsPage