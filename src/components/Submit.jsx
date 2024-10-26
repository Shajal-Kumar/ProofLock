import React, { useRef } from "react";

const Submit = ({ handleSubmit, message, transactionHash }) => {
  const dialogRef = useRef(null);

  const showModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  return (
    <div>
      <button
        className="btn border-2 border-black bg-white text-purple-700 hover:bg-purple-700 hover:text-white"
        onClick={() => handleSubmit(showModal)}
      >
        Submit
      </button>
      <dialog ref={dialogRef} id="Submit" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white text-purple-700">
          <h3 className="font-bold text-lg">Result</h3>
          <p className="py-4">
            {message && <p className="mt-4 text-purple-500">{message}</p>}
            {transactionHash && <p className="mt-4 break-all break-words whitespace-pre-wrap text-green-500">Transaction Hash: {transactionHash}</p>}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Submit;