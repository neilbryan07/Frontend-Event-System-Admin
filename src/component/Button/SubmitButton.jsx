import React from 'react'

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

export const SubmitButton = ({ btnTxt, handleClick }) => {
    return (
         <div onClick={ handleClick } className='bg-[#839f55]  flex flex-row gap-2 items-center justify-center rounded py-2 px-4 cursor-pointer text-white font-medium hover:bg-[#556fa8]'>
            <span >{btnTxt}</span>
            <span> <SendOutlinedIcon /></span>
        </div>
    )
}

export default SubmitButton