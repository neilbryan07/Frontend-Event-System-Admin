import React, { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import SubmitButton from '../../component/Button/SubmitButton';

import { APIServices } from '../../contants/apiConfig';
import { useDispatch } from 'react-redux';
import { storeUserDetails } from '../../redux/userSlice';

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        const checkToken = localStorage.getItem("access_token")

        if (checkToken) {
            navigate("/app/event")
        }

    }, []);

    const handleToggle = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        setErrorMessage(null)

        // ✅ Validation
        if (!form?.email || !form?.password) {
            setErrorMessage("Email and password are required.");
            return;
        }


        const response = await APIServices.post({
            url: '/611-login', payload: {
                "email": form?.email,
                "password": form?.password
            }
        });

        if (response.status === 200) {

            if (!response?.data?.is_hr) {
                setErrorMessage("Only Hr account is allowed.")
                return;
            }

            localStorage.setItem("access_token", response?.data?.access_token);

            dispatch(
                storeUserDetails({
                    id: response?.data?.user?.id,
                    name: response?.data?.user?.name,
                    role_id: response?.data?.user?.role_id,
                    email: response?.data?.user?.email,
                    campaign_id: response?.data?.user?.campaign_id,
                    gender: response?.data?.user?.gender,
                })
            );

            navigate("/app/event")

        } else if (response[0]?.status === 403) {
            setErrorMessage(response[0]?.response?.data?.message)
        }

        else {
            setErrorMessage("Invalid Credentials")
        }

    }

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center bg-gray-200'>

            <div className='max-w-[450px] w-full bg-white rounded-xl shadow-xl/30 border border-gray-200 pt-3 px-3 mb-20 pb-9'>

                <div className='w-full flex flex-col items-center gap-3 mt-5'>

                    <span className='text-[#556fa8]'><LockPersonOutlinedIcon /></span>

                    <div className='self-center'>
                        <img class="default_logo lazyloaded" src="https://www.sixelevenbpo.com/wp-content/uploads/2020/05/six-eleven-center-logo.png" alt="six-eleven-center-logo" data-ll-status="loaded" />
                    </div>

                    <h1 className='text-gray-500 text-sm'>Enter your credentials to access your account</h1>

                </div>

                <div className='w-full flex flex-col gap-4 my-5 px-4'>

                    <div className='flex flex-col gap-2'>
                        <span className='text-[#556fa8] text-sm font-semibold'>Email</span>
                        <TextField
                            id="outlined-basic"
                            label="type here.."
                            variant="outlined"
                            size="small"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>


                    <div className='flex flex-col gap-2'>
                        <span className='text-[#556fa8] text-sm font-semibold'>Password</span>

                        <TextField
                            id="outlined-password"
                            label="type here.."
                            variant="outlined"
                            size="small"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleToggle} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                </div>

                <Divider variant="middle" />

                <div className='w-full flex flex-col items-center gap-3 mt-5 px-4'>

                    <SubmitButton btnTxt={"Sign In"} handleClick={handleLogin} />

                    {errorMessage && (
                        <div className="flex flex-row gap-2 items-center">
                            <span className="text-red-500">
                                <ErrorOutlineIcon />
                            </span>
                            <h1 className="text-red-500 text-sm">
                                {errorMessage}
                            </h1>
                        </div>
                    )}


                    <div className='flex flex-row gap-2 items-center'>
                        <span className='text-[#556fa8]'> <CalendarMonthIcon /></span>
                        <h1 className='text-gray-500 text-sm'>Admin Event System Portal</h1>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default LoginPage
