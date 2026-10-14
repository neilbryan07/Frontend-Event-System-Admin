import React from 'react'

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

import { SidebarItems } from './SidebarItems/SidebarItems'

import { pageRoutes } from "../../routes/pageRoutes"

// import { useSelector } from 'react-redux';

const Sidebar = () => {

    // const user = useSelector((state) => state.user.userData)

    return (
        <div className='min-w-[230px] max-w-[230px] w-full h-full flex flex-col border-r border-gray-300 p-4 bg-white'>

            <div className='self-start'>
                <img className="default_logo lazyloaded" src="https://www.sixelevenbpo.com/wp-content/uploads/2020/05/six-eleven-center-logo.png" alt="six-eleven-center-logo" data-ll-status="loaded" />
            </div>

            <div className='flex flex-col gap-2 mt-8'>

                <h1 className='text-[#556fa8] font-normal text-xs'>Overview</h1>
                <SidebarItems icon={<CalendarMonthOutlinedIcon fontSize="small" />} name={"Active Events"} anchor={pageRoutes.EVENT} />
                <SidebarItems icon={<ArchiveOutlinedIcon fontSize="small" />} name={"Archived Events"} anchor={pageRoutes.EVENTLIST} />
                <SidebarItems icon={<CampaignOutlinedIcon fontSize="small" />} name={"Advertisement"} anchor={pageRoutes.ADS} />

            </div>

            {/* <SidebarContainer name={"Applicant Content"}>

               

                <SidebarItems icon={<ListAltOutlinedIcon fontSize="small" />} name={"All Applicants"} anchor={pageRoutes.ListApplicant} />
               

            </SidebarContainer> */}


        </div>
    )
}

export default Sidebar
