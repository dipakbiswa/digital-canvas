import React from "react";

//* Create FormControls component to be used in Login & Signup pages
export default function FormControls({ label, type, id, value, setValue }) {
  return (
    // <div className="flex flex-col items-center">
    <label htmlFor={id}>
      {/* <p>{label}</p> */}
      <input
        className="
            w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500
          "
        onChange={(e) => setValue(e.target.value)}
        required
        value={value}
        type={type}
        name={id}
        id={id}
        placeholder={id === "email" ? "example@email.com" : "password"}
      />
    </label>
    // </div>
  );
}
