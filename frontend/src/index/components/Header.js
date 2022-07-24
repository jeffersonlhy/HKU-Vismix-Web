import React, { useState } from "react";
import "./App.css";
import logo from '../../asset/logo_name_v3.svg'

function Header(){
    return (
        <div className="flex h-16 min-w-full gap-3 justify-between items-center bg-dark-grey shadow-2xl">
            <div className="md:ml-16 ml-8">
                <img className="h-24 w-20" src={logo} alt="logo"/>
            </div>
            <div className="text-xxs md:text-ssm text-font-grey mr-4 ">
                <span className="md:pr-3 pr-1 ">HKU</span>
                <span className="md:pl-3 pl-1 border-l sub-font-grey-font-grey">{`For Academic Year 2021/22`}</span>
                <span className="text-ssm text-sub-font-grey ml-3 md:inline block md:text-left text-right">
                    in preview
                </span>
            </div>
        </div>
    )
}

export default Header
