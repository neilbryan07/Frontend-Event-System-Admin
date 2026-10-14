import React from 'react'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export const CloseButton = ({ btnTxt , handleClick = null }) => {
    return (
        <div onClick={ handleClick } className='bg-gray-500 flex flex-row gap-2 items-center justify-center rounded py-2 px-4 cursor-pointer text-white font-medium hover:bg-gray-800'>
            <span >{btnTxt}</span>
            <span> <CancelOutlinedIcon /></span>
        </div>
    )
}

export default CloseButton