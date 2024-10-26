import React from 'react';
import Submit from './Submit';

const Cards = () => {
  return (
    <div className='flex flex-row flex-wrap mt-10 pt-10 justify-center text-white'>
      <div className="card bg-purple-700 w-96 shadow-xl m-2 hover:bg-white hover:text-purple-700">
      <figure className="px-10 pt-5">
          <img
          src="https://static.thenounproject.com/png/7319334-512.png"
          alt="Shoes"
          className="size-10" />
      </figure>
      <div className="card-body items-center text-center">
          <h2 className="card-title">Upload Evidence</h2>
          <input type="file" className="mt-5 file-input file-input-ghost w-full max-w-xs border-2 border-white hover:border-purple-700" />
          <div className="mt-5 card-actions">
            <Submit/>
          </div>
      </div>
      </div>

      <div className="card bg-purple-700 w-96 shadow-xl m-2 hover:bg-white hover:text-purple-700">
      <figure className="px-10 pt-5">
          <img
          src="https://static.thenounproject.com/png/7332459-512.png"
          alt="Shoes"
          className="rounded-full p-1 border-[3px] border-black size-10" />
      </figure>
      <div className="card-body items-center text-center">
          <h2 className="card-title">View Evidence</h2>
          <input type="text" placeholder="Enter Case ID" className="mt-5 input input-ghost w-full max-w-xs border-2 border-white hover:border-purple-700" />
          <div className="mt-5 card-actions">
          <Submit/>
          </div>
      </div>
      </div>

      <div className="card bg-purple-700 w-96 shadow-xl m-2 hover:bg-white hover:text-purple-700">
      <figure className="px-10 pt-5">
          <img
          src="https://static.thenounproject.com/png/2709634-512.png"
          alt="Shoes"
          className="size-10" />
      </figure>
      <div className="card-body items-center text-center">
          <h2 className="card-title">Verify Evidence</h2>
          <input type="text" placeholder="Enter Case ID" className="mt-5 input input-ghost w-full max-w-xs border-2 border-white hover:border-purple-700" />
          <div className="mt-5 card-actions">
          <Submit/>
          </div>
      </div>
      </div>

      <div className="card bg-purple-700 w-96 shadow-xl m-2 hover:bg-white hover:text-purple-700">
      <figure className="px-10 pt-5">
          <img
          src="https://static.thenounproject.com/png/6735925-512.png"
          alt="Shoes"
          className="size-10" />
      </figure>
      <div className="card-body items-center text-center">
          <h2 className="card-title">Append to Evidence Chain</h2>
          <input type="text" placeholder="Enter Case ID" className="mt-5 input input-ghost w-full max-w-xs border-2 border-white hover:border-purple-700" />
          <input type="file" className="mt-3 file-input file-input-ghost w-full max-w-xs border-2 border-white hover:border-purple-700" />
          <div className="card-actions">
          <Submit/>
          </div>
      </div>
      </div>
    </div>
    
  );
};

export default Cards;
