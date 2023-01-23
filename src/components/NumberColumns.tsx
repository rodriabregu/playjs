import React from "react";

export function NumberColumns({ lines }: { lines: number }) {
  return (
    <div>
      {Array.from(Array(lines).keys()).map((e) => (
        <span className='numberColumns' key={e}>
          {e + 1}
        </span>
      ))}
    </div>
  );
}
