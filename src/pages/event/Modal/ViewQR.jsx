import React, { useState, useRef } from 'react'
import { toPng } from "html-to-image";

import Backdrop from '@mui/material/Backdrop';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import SubmitButton from '../../../component/Button/SubmitButton';
import CloseButton from '../../../component/Button/CloseButton';

import { handleTimeFormat } from '../../../contants/contans';

const ViewQR = ({ openModal, handleClose, QR }) => {

    const ref = useRef();
    const [imgFile, setImgFile] = useState(null);

    const downloadPng = async () => {
        try {
            const dataUrl = await toPng(ref.current, {
                pixelRatio: 3,      // Multiplies the resolution by 4
                skipAutoScale: true,
                cacheBust: true,
            });

            const link = document.createElement("a");
            link.download = "qr-code.png";
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openModal}
        >

            <div className='max-w-[500px] w-full p-4 bg-white rounded-lg flex flex-col gap-2'>

                <div className='w-full flex flex-row items-center justify-between border-b border-gray-200 pb-2'>

                    <h1 className='text-sm text-[#556fa8] font-medium'>View Event QR</h1>

                    <div onClick={handleClose} className='flex flex-col items-center'>
                        <span className='text-gray-500 cursor-pointer'>
                            <CancelOutlinedIcon size="s" />
                        </span>

                    </div>

                </div>

                <div className='w-full flex flex-col gap-2 overflow-y-auto overscroll-x-auto overflow-x-auto'>

                    <div ref={ref} className='max-w-[400px] max-h-[800px] w-full h-full self-center p-4 flex flex-col items-center gap-5 bg-white'>
                        <h1 className='text-black'>{QR?.event?.name}</h1>
                        <img src={`${import.meta.env.VITE_API_URL}/api/event-qr/${QR?.time?.id}`} alt="svg" />
                        <div className='flex flex-row gap-3 items-center'>
                            <h1 className='text-black'>{QR?.time?.day_name}</h1>
                            <h1 className='text-black'>{handleTimeFormat(QR?.time?.event_start)}</h1>
                        </div>

                    </div>

                    <div className='w-full flex flex-row justify-end gap-2 mt-2'>

                        <SubmitButton btnTxt={"Download QR"} handleClick={downloadPng} />
                        <CloseButton btnTxt={"Close"} handleClick={handleClose} />

                    </div>

                </div>

            </div>

        </Backdrop>
    )
}

export default ViewQR;