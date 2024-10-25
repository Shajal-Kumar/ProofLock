import Input from './Input';
import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 navbar-primary">
    <div className="navbar-start ">
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a>Home</a></li>
                <li>
                <a>Actions</a>
                <ul className="p-2">
                    <li><a>Upload Evidence</a></li>
                    <li><a>View Evidence</a></li>
                    <li><a>Append to Evidence</a></li>
                    <li><a>Aggregate Evidence</a></li>
                </ul>
                </li>
                <li><a>FAQs</a></li>
            </ul>
            </div>
            <a className="btn btn-ghost text-xl">ProofLock</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
            <li><a>Home</a></li>
            <li>
                <details>
                <summary>Actions</summary>
                <ul className="p-2">
                    <li><a>Upload Evidence</a></li>
                    <li><a>View Evidence</a></li>
                    <li><a>Append to Evidence</a></li>
                    <li><a>Aggregate Evidence</a></li>
                </ul>
                </details>
            </li>
            <li><a>FAQs</a></li>
            </ul>
        </div>
        <div className="navbar-end">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-accent btn-outline" onClick={()=>document.getElementById('login').showModal()}>Login</button>
            <dialog id="login" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Login</h3>
                    <br></br>
                    <select className="select select-accent w-full max-w-xs">
                        <option disabled selected>Select Your Role</option>
                        <option>Forensic Analyst</option>
                        <option>Police Officer</option>
                        <option>Jury</option>
                    </select>
                <Input></Input>
                <br></br>
                <button className="btn btn-secondary btn-outline">Submit</button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Close</button>
            </form>
            </dialog>
        </div>
    </div>
  );
};

export default Navbar;
