import React from 'react'

import CircularProgress from '@mui/material/CircularProgress';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const UpdateButton = ({ btnTxt, handleClick = null, isLoading = false }) => {
    return (
        <div onClick={handleClick} className='bg-blue-400  flex flex-row gap-2 items-center justify-center rounded py-2 px-4 cursor-pointer text-white font-medium hover:bg-blue-800'>
            <span className='text-sm' >{btnTxt}</span>
            <span> {!isLoading ? <EditOutlinedIcon sx={{ fontSize: 20 }} /> : <CircularProgress size={20} />}</span>
        </div>
    )
}

export default UpdateButton