import {
  ChevronDownIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const renderForm = (i: number) => {
  type Fields = {
    placeholder: string;
    type: string;
    icon?: object | undefined;
    pattern?: string | undefined;
    choices?: string[] | undefined;
  };

  const fields: Fields[][] = [
    [
      {
        placeholder: "Email",
        type: "text",
        icon: (
          <EnvelopeIcon
            className="absolute h-8 w-8 mr-4 right-0 text-gray"
            strokeWidth="2"
          />
        ),
      },
      {
        placeholder: "Password",
        type: "password",
        icon: (
          <LockClosedIcon
            className="absolute h-8 w-8 mr-4 right-0 text-gray"
            strokeWidth="2"
          />
        ),
      },
      {
        placeholder: "User Type",
        type: "select",
        choices: ["Trainer", "Trainee"],
      },
    ],
    [
      { placeholder: "First Name", type: "text" },
      { placeholder: "Last Name", type: "text" },
      { placeholder: "Birth date", type: "date" },
      {
        placeholder: "Citizen ID",
        type: "text",
        pattern: "[0-9]{13}",
      },
      {
        placeholder: "Phone number",
        type: "text",
        pattern: "[0-9]{10}",
      },
      {
        placeholder: "Gender",
        type: "select",
        choices: ["Male", "Female", "Other"],
      },
    ],
    [
      {
        placeholder: "House No. & Street",
        type: "text",
      },
      { placeholder: "Postal code", type: "text", pattern: "[0-9]{5}" },
    ],
  ];

  const [selected, setSelected] = useState<string>();

  return (
    <>
      {fields[i].map((field) => {
        return (
          <div className="relative flex items-center">
            {field.type == "select" ? (
              <>
                <select
                  className="w-full px-3.5 py-2.5 mt-2 mb-2 mx-2 block border border-gray rounded-xl appearance-none hover:cursor-pointer bg-white"
                  value={selected}
                  defaultValue={""}
                  onChange={(event) => setSelected(event.target.value)}
                  required
                  name={field.placeholder}
                >
                  <option disabled value="" hidden key="default">
                    {field.placeholder}
                  </option>
                  {field.choices?.map((choice) => {
                    return (
                      <option value={choice} key={choice}>
                        {choice}
                      </option>
                    );
                  })}
                </select>
                <ChevronDownIcon
                  className=" absolute h-7 w-7 mr-5 right-0"
                  strokeWidth="2"
                />
              </>
            ) : (
              <input
                className={
                  "w-full py-2.5 mt-2 mb-2 mx-2 block border border-gray rounded-xl" +
                  (field.icon != null ? " pl-3.5 pr-12" : " px-3.5")
                }
                placeholder={field.placeholder}
                type={field.type}
                pattern={field.pattern ?? "*"}
                required
                name={field.placeholder}
              />
            )}
            {field.icon != null ? <>{field.icon}</> : <></>}
          </div>
        );
      })}
    </>
  );
};

export default function Signup() {
  return (
    <main className="flex h-screen bg-backgroundColor">
      <div className="w-2/5 h-full bg-blue hidden md:flex flex-col items-center justify-center">
        <img src="/signup.png" alt="" className="object-contain h-3/5 my-12" />
        <p className="text-center text-white text-xl">
          Make an appointment then start workout!
        </p>
      </div>
      <div className="w-full md:w-3/5 h-full flex flex-col justify-center items-center">
        <p className="text-center text-4xl">Hello !</p>
        <p className="text-gray text-center">
          Please enter your personal details <br /> and start journey with us
        </p>
        <form className="w-4/5 mt-3 flex flex-col" action="">
          <div className="grid grid-cols-2 justify-items-stretch">
            {renderForm(0)}
          </div>
          <div className="w-full flex flex-col">
            <h1>Personal information</h1>
            <div className="grid grid-cols-2 justify-items-stretch">
              {renderForm(1)}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <h1>Address</h1>
            <div className="grid grid-cols-2 justify-items-stretch">
              {renderForm(2)}
            </div>
            <input
              className="pl-3.5 pr-12 py-2.5 mt-2 mb-2 mx-2 block border border-gray rounded-xl"
              placeholder="Sub district, District, Province"
              type="text"
              disabled
            />
          </div>
          <div className="flex justify-center">
            <button
              className="w-1/2 py-2.5 px-3 mt-10 mb-3 bg-pink hover:bg-pink-dark shadow rounded-xl text-white"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
