/* eslint-disable max-len */
/* import { ReactNode } from 'react';

type ErrorMessageProps = {
  children: ReactNode;
}; */

import { PropsWithChildren } from 'react';

/*PropsWithChildren vs ReactNode in TypeScript: 
https://medium.com/@colorsong.nabi/propswithchildren-vs-reactnode-in-typescript-c3182cbf7124#:~:text=If%20your%20component%20is%20designed,different%20children%20types%2C%20then%20React.
*/
const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
      {children}
    </p>
  );
};

export default ErrorMessage;
