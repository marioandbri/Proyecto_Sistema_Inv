import React from 'react';

const LoadingBar = (key) => {
   return (
      <tr key={key}>
         <td colSpan='8'>
            <progress className="progress is-info" max="100"></progress>
         </td>
      </tr>
   );
}

export default LoadingBar;
