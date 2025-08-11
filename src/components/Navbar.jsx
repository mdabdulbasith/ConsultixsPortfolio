import React from 'react';
import Logo from '../assets/consultixs Logo 1.png'; // Update path if needed

const Navbar = () => {
    return (
        <>
            <div className="w-full px-4 py-3 text-white mt-2 top-0 sticky bg-black">
                <div className="relative flex flex-row items-center justify-between">
                    {/* Left: Logo + Text */}
                    <div className="flex items-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 overflow-hidden mr-2 sm:mr-3">
                            <img
                                src={Logo}
                                alt="Logo"
                                className="w-full h-full object-cover object-left"
                            />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[18px] sm:text-[28px] font-semibold font-poppins">
                                Consultixs
                            </span>
                            <span className="text-[10px] sm:text-[12px] font-poppins">
                                Business Consulting
                            </span>
                        </div>
                    </div>

                    {/* Center: Portfolio (only on sm and up) */}
                    <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 text-[20px] sm:text-[24px] font-poppins text-center">
                        Portfolio
                    </div>

                    {/* Right: Button */}
                    <div>
                        <button
                            className="px-3 py-1.5 sm:px-4 sm:py-2 text-white font-bold text-[14px] sm:text-[16px] hover:opacity-90 transition"
                            style={{
                                background: 'linear-gradient(180deg, #0BC0FD 0%, #055EF2 71.63%)',
                                borderRadius: '12px',
                            }}
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
