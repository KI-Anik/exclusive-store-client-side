import React from 'react';

const Footer = () => {
    return (
        <footer className=' text-center space-y-10 pt-10'>
            <div>
                <h1 className='text-3xl font-bold'>Exclusive-store</h1>
                <p className='mt-2'>
                    Leading the way in cutting-edge technology and innovation.
                </p>
            </div>
            <div>
                <footer className="footer p-10 justify-between w-1/2 mx-auto">

                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </footer>
            </div>
        </footer>

    );
};

export default Footer;