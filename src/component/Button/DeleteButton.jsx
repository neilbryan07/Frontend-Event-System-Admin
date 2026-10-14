import React from 'react'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';

export const DeleteButton = ({ btnTxt, handleClick = null, isLoading = false }) => {
    return (
        <div onClick={handleClick} className='bg-red-500 flex flex-row gap-2 items-center justify-center rounded py-2 px-4 cursor-pointer text-white font-medium hover:bg-red-800'>
            <span className='text-sm' >{btnTxt}</span>
            <span> {!isLoading ? <DeleteOutlineOutlinedIcon sx={{ fontSize: 20 }} /> : <CircularProgress size={20} />}</span>
        </div>
    )
}

export default DeleteButton