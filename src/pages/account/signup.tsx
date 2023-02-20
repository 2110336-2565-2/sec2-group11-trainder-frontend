import { register } from "@/services/auth.service";
import type { RegistrationData } from "@/services/auth.service";
import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import Places from "@/components/places";
import { useLoadScript } from "@react-google-maps/api";
import { Dropdown } from "@/components/dropdown";
import { getGeocode, getLatLng } from "use-places-autocomplete";

type RegistrationFormInput = {
  username: { value: string };
  password: { value: string };
  userType: { value: string };
  firstname: { value: string };
  lastname: { value: string };
  birthdate: { value: string };
  citizenId: { value: string };
  phoneNumber: { value: string };
  gender: { value: string };
  address: { value: string };
};

export default function Signup() {
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const renderForm = (i: number) => {
    type Fields = {
      placeholder: string;
      name: string;
      type: string;
      icon?: object | undefined;
      pattern?: string | undefined;
      choices?: string[] | undefined;
    };

    const fields: Fields[][] = [
      [
        {
          placeholder: "Username",
          name: "username",
          type: "text",
          icon: (
            <UserCircleIcon
              className="absolute h-8 w-8 mr-4 right-0 text-gray"
              strokeWidth="2"
            />
          ),
        },
        {
          placeholder: "Password",
          name: "password",
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
          name: "userType",
          type: "select",
          choices: ["User Type", "Trainer", "Trainee"],
        },
      ],
      [
        { placeholder: "First Name", name: "firstname", type: "text" },
        { placeholder: "Last Name", name: "lastname", type: "text" },
        { placeholder: "Birth date", name: "birthdate", type: "date" },
        {
          placeholder: "Citizen ID",
          name: "citizenId",
          type: "text",
          pattern: "[0-9]{13}",
        },
        {
          placeholder: "Phone number",
          name: "phoneNumber",
          type: "text",
          pattern: "[0-9]{10}",
        },
        {
          placeholder: "Gender",
          name: "gender",
          type: "select",
          choices: ["Gender", "Male", "Female", "Other"],
        },
      ],
    ];

    return (
      <>
        {fields[i].map((field, index) => {
          return (
            <div key={index}>
              {field.type == "select" ? (
                <div className="py-2 px-2 w-full h-full">
                  <Dropdown
                    name={field.name}
                    value={
                      field.name === "userType"
                        ? selectedUserType
                        : selectedGender
                    }
                    onChange={
                      field.name === "userType"
                        ? setSelectedUserType
                        : setSelectedGender
                    }
                    options={field.choices ?? []}
                    multiple={false}
                    placeholder={field.placeholder}
                  />
                </div>
              ) : (
                <div
                  className={`${
                    field.icon ? "relative" : ""
                  } flex items-center`}
                >
                  <input
                    className={
                      "w-full py-2.5 mt-2 mb-2 mx-2 block border border-gray rounded-xl" +
                      (field.icon != null ? " pl-3.5 pr-12" : " px-3.5")
                    }
                    placeholder={field.placeholder}
                    type={field.type}
                    pattern={field.pattern}
                    required
                    name={field.name}
                  />
                  {field.icon != null ? <>{field.icon}</> : <></>}
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  const handleRegistrationForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = e.target as typeof e.target & RegistrationFormInput;
      const results = await getGeocode({ address: formData.address.value });
      const { lat, lng } = await getLatLng(results[0]);
      register({
        username: formData.username.value,
        password: formData.password.value,
        userType: formData.userType.value,
        firstname: formData.firstname.value,
        lastname: formData.lastname.value,
        birthdate: formData.birthdate.value,
        citizenId: formData.citizenId.value,
        phoneNumber: formData.phoneNumber.value,
        gender: formData.gender.value,
        address: formData.address.value,
        lat: lat,
        lng: lng,
      } as RegistrationData)
        .then(() => {
          // TODO: Show registration successful, wait a bit, then redirect back to login.
          router.push("/");
        })
        .catch((error: AxiosError) => {
          if (error.response && error.response.status !== 200) {
            const errorMsg = error.response as typeof error.response & {
              data: {
                message: string;
              };
            };
            if (errorMsg.data.message !== undefined) {
              alert(errorMsg.data.message);
              return;
            }
          }
          throw error;
        });
    },
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      : "",
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;

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
        <form
          className="w-4/5 mt-3 flex flex-col"
          action=""
          onSubmit={handleRegistrationForm}
        >
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
            <div className="w-full pr-3.5">
              <Places />
            </div>
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
