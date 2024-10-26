import React from 'react';

const Submit = () => {
  return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn border-2 border-black bg-white text-purple-700 hover:bg-purple-700 hover:text-white" onClick={()=>document.getElementById('Submit').showModal()}>Submit</button>
        <dialog id="Submit" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white text-purple-700">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  );
};

export default Submit;
