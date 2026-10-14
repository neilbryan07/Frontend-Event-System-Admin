import React from 'react'

import CircularProgress from '@mui/material/CircularProgress';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const CreateButton = ({ btnTxt, handleClick = null, isLoading = false }) => {
    return (
        <div onClick={handleClick} className='bg-[#839f55]  flex flex-row gap-2 items-center justify-center rounded py-2 px-4 cursor-pointer text-white font-medium hover:bg-[#556fa8]'>
            <span className='text-sm' >{btnTxt}</span>
            <span> {!isLoading ? <AddCircleOutlineOutlinedIcon sx={{ fontSize: 20 }} /> : <CircularProgress size={20} />}</span>
        </div>
    )
}

export default CreateButton