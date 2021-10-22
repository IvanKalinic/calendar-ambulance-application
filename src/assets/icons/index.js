import * as React from "react";

export const Edit = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="8px"
      height="8px"
      {...props}
    >
      <path d="M12.031 2.023c-.496 0-.965.247-1.355.633l-8.114 8.07-1.355 4.06 4.059-1.352.086-.082 8.035-7.985c.386-.39.629-.86.629-1.355 0-.496-.243-.965-.63-1.356-.39-.386-.859-.633-1.355-.633zm-2.004 2.688l1.293 1.297-6.593 6.554-1.938.645.648-1.941z" />
    </svg>
  );
};

export const Plus = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      {...props}
    >
      <path fillRule="evenodd" d="M11 2v9H2v2h9v9h2v-9h9v-2h-9V2z" />
    </svg>
  );
};

export const Minus = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="459.313px"
      height="459.314px"
      viewBox="0 0 459.313 459.314"
      xmlSpace="preserve"
      {...props}
    >
      <path d="M459.313 229.648c0 22.201-17.992 40.199-40.205 40.199H40.181c-11.094 0-21.14-4.498-28.416-11.774C4.495 250.808 0 240.76 0 229.66c-.006-22.204 17.992-40.199 40.202-40.193h378.936c22.195.005 40.17 17.989 40.175 40.181z" />
    </svg>
  );
};
