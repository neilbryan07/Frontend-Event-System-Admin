import React, { lazy, Suspense, useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { APIServices } from '../../../contants/apiConfig';

const FilterEvent = lazy(() => import('../Modal/FilterEvent'));
const CreateEvent = lazy(() => import('../Modal/CreateEvent'));
const DeleteEvent = lazy(() => import('../Modal/DeleteEvent'));

const ViewEvent = lazy(() => import('../Modal/ViewEvent'));

const ArchivedEvent = () => {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [modalState, setModalState] = useState({
        view: false,
        filter: false,
    });

    const [evenlist, setEvenlist] = useState([]);
    const [search, setSearch] = useState('');


    const handleClick = (row) => {
        setSelectedEvent(row ? row : [])
        setModalState(prev => ({
            ...prev,
            view: true,
        }));
    };

    const handleCloseEvent = () => {
        setModalState({
            filter: false,
            view: false,
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on rowsPerPage change
    };

    useEffect(() => {
        handleFetchEvents();
    }, [rowsPerPage, page, search]);


    const handleFetchEvents = async () => {

        const response = await APIServices.get({
            url: `/events?search=${search}&per_page=${rowsPerPage}&page=${page + 1}`
        });

        if (response.status === 200) {
            // setEvenlist(response?.events);
            setEvenlist(response?.data);
        }

    }


    return (
        <div className='w-full'>

            <Suspense>
                {modalState.filter && <FilterEvent openModal={modalState.filter} handleClose={handleCloseEvent} />}
            </Suspense>

            <Suspense>
                {modalState.view && <ViewEvent openModal={modalState.view} handleClose={handleCloseEvent} eventData={selectedEvent} />}
            </Suspense>

            <div className='w-full flex flex-row items-center justify-between'>

                <div className='flex flex-row items-center gap-2'>
                    <h1 className='font-normal text-lg text-gray-700'>Six Eleven Archived Events Table</h1>
                </div>

                <div className='flex flex-row gap-2 items-center'>
                    <TextField id="outlined-basic" label="Search Event..." variant="outlined" size='small' onChange={(e) => setSearch(e.target.value)} />

                    {/* <Tooltip title="Create Event">
                        <div onClick={e => setOpenCreate(true)} className='p-[6px] rounded-lg border border-blue-700 bg-blue-500 cursor-pointer'>
                            <span className='text-white'><AddCircleOutlineIcon /></span>
                        </div>
                    </Tooltip> */}

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
                                        <h1 className='text-[#556fa8] text-xs'>Event Name</h1>
                                    </div>

                                </TableCell>

                                <TableCell>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <h1 className='text-[#556fa8] text-xs'>Event Image</h1>
                                    </div>

                                </TableCell>

                                <TableCell>
                                    <h1 className='text-[#556fa8] text-xs text-center'>Action</h1>
                                </TableCell>


                            </TableRow>

                        </TableHead>

                        <TableBody>
                            {evenlist?.events?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: row?.for_manual_checking ? '#f2ffe6' : 'white' }}
                                >
                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-semibold'>{row?.id}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <h1 className='text-gray-500 text-xs font-bold'>{row?.name}</h1>
                                    </TableCell>

                                    <TableCell>
                                        <img src={row?.image} alt="preview" className="max-w-[70px] max-h-[70px] rounded self-center" />
                                    </TableCell>

                                    <TableCell sx={{ maxWidth: '100px' }}>

                                        <div className='flex flex-row items-center justify-center gap-2 cursor-pointer' onClick={e => handleClick(row)}>
                                            <VisibilityIcon color='primary' />
                                        </div>

                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={evenlist?.pagination?.total || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />


                </TableContainer>


            </div>

        </div>
    )
}

export default ArchivedEvent