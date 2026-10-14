import React, { useState, useEffect } from 'react'

import { Button, TextField, Box, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import SubmitButton from '../../../../component/Button/SubmitButton';
import CloseButton from '../../../../component/Button/CloseButton';
import DeleteButton from '../../../../component/Button/DeleteButton';

import { APIServices } from '../../../../contants/apiConfig';

const FilterTable = ({ openModal, handleClose, setFilter, filter }) => {

    const [imgDescription, setImgDescription] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null)

    const [omList, setOmList] = useState([])
    const [camList, setCamList] = useState([])
    const [branchList, setBranchlist] = useState([])

    const handleFetchOm = async () => {

        let URLQuery = `/oms`

        const response = await APIServices.get({
            url: URLQuery,
        });

        if (response.status === 200) {
            setOmList(response?.data?.data);
        }

    }

    const handleFetchCampaign = async () => {

        let URLQuery = `/campaigns/list`

        const response = await APIServices.get({
            url: URLQuery,
        });

        if (response.status === 200) {
            setCamList(response?.data?.data);
        }

    }


    const handleFetchBranch = async () => {

        let URLQuery = `/branches`

        const response = await APIServices.get({
            url: URLQuery,
        });

        if (response.status === 200) {
            setBranchlist(response?.data?.data);
        }

    }

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
    };

    const handleFilter = (e) => {
        const { name, value } = e.target;

        setFilter((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleFilterRemove = () => {
        setFilter(
            Object.keys(filter).reduce((acc, key) => {
                acc[key] = null;
                return acc;
            }, {})
        );

        handleClose();
    };

    useEffect(() => {
        handleFetchOm();
        handleFetchCampaign();
        handleFetchBranch();
    }, []);

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>Filter Event</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    {/* <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by OM:</h1>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                        >
                            <MenuItem value={0}>OM 1</MenuItem>
                            <MenuItem value={1}>OM 2</MenuItem>

                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by Branch:</h1>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                        >
                            <MenuItem value={0}>Maa</MenuItem>
                            <MenuItem value={1}>Mabini</MenuItem>
                            <MenuItem value={2}>Ecoland</MenuItem>

                        </Select>
                    </FormControl> */}

                    <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by Account Type:</h1>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter?.role}
                            onChange={handleFilter}
                            name='role'
                        >
                            <MenuItem value={null}>-----</MenuItem>
                            <MenuItem value={1}>Admin</MenuItem>
                            <MenuItem value={2}>OM</MenuItem>
                            <MenuItem value={3}>Employee</MenuItem>
                            <MenuItem value={4}>Guest</MenuItem>
                            <MenuItem value={5}>Visitor</MenuItem>

                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by Registration:</h1>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter?.status}
                            onChange={handleFilter}
                            name='status'
                        >
                            <MenuItem value={null}>-----</MenuItem>
                            <MenuItem value={1}>Pre-registration</MenuItem>
                            <MenuItem value={2}>Showed Up</MenuItem>
                            <MenuItem value={3}>Late-registration</MenuItem>
                            <MenuItem value={4}>Cancelled</MenuItem>

                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by Branch:</h1>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter?.branch}
                            onChange={handleFilter}
                            name='branch'
                        >
                            <MenuItem value={null}>-----</MenuItem>
                            {branchList?.map((row, index) => (
                                <MenuItem key={index} value={row?.id}>{row?.name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by Campaign:</h1>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter?.campaign}
                            onChange={handleFilter}
                            name='campaign'
                        >
                            <MenuItem value={null}>-----</MenuItem>
                            {camList?.map((row, index) => (
                                <MenuItem key={index} value={row?.id}>{row?.name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>


                    <FormControl fullWidth>
                        <h1 className='text-xs text-[#839f55] font-bold mb-2'>Filter by OM:</h1>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter?.om}
                            onChange={handleFilter}
                            name='om'
                        >
                            <MenuItem value={null}>-----</MenuItem>
                            {omList?.map((row, index) => (
                                <MenuItem key={index} value={row?.id}>{row?.name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>

                    <div className='w-full flex flex-row justify-end gap-2 mt-2'>

                        <SubmitButton btnTxt={"Filter"} handleClick={handleClose} />
                        <DeleteButton btnTxt={"Remove Filter"} handleClick={handleFilterRemove} />

                    </div>

                </div>

            </div>

        </Backdrop >
    )
}

export default FilterTable;