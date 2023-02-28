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
import { Button } from "@/components/button";
import { InputBox } from "@/components/inputBox";
import Link from "next/link";
import Image from "next/image";

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
  const [isFormCompleted, setFormCompleted] = useState<boolean>(false);
  const [isPasswordMatched, setPasswordMatch] = useState<boolean>(true);

  type Field = {
    placeholder: string;
    name: string;
    type: string;
    icon?: object | undefined;
    pattern?: string | undefined;
    choices?: string[] | undefined;
  };

  const fields: Field[][] = [
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
        placeholder: "User Type",
        name: "userType",
        type: "select",
        choices: ["User Type", "Trainer", "Trainee"],
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
        placeholder: "Confirm Password",
        name: "confirmPassword",
        type: "password",
        icon: (
          <LockClosedIcon
            className="absolute h-8 w-8 mr-4 right-0 text-gray"
            strokeWidth="2"
          />
        ),
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

  const renderForm = (i: number) => {
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
                <>
                  <InputBox
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                    required={true}
                    pattern={field.pattern}
                    icon={field.icon}
                    borderColor={
                      field.type === "password"
                        ? isPasswordMatched
                          ? undefined
                          : "border-pink-dark"
                        : undefined
                    }
                  />
                  {field.type === "password" && !isPasswordMatched && (
                    <div className="text-sm mx-4 mb-2 text-pink-dark">
                      Password does not match.
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </>
    );
  };

  const handleFormCompletion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check all field is filled
    let isCompleted = true;
    fields.map((part) => {
      part.map((field) => {
        const data = e.currentTarget.elements.namedItem(
          field.name
        ) as HTMLInputElement;
        if (data.value === undefined || data.value === "") {
          isCompleted = false;
          setFormCompleted(false);
          return;
        }
      });
      if (!isCompleted) return;
    });

    // check password is matched
    const password = e.currentTarget.elements.namedItem(
      "password"
    ) as HTMLInputElement;
    const confirmPassword = e.currentTarget.elements.namedItem(
      "confirmPassword"
    ) as HTMLInputElement;
    if (
      confirmPassword.value !== "" &&
      password.value !== confirmPassword.value
    ) {
      setPasswordMatch(false);
      setFormCompleted(false);
      return;
    } else {
      setPasswordMatch(true);
    }

    setFormCompleted(isCompleted);
  };

  const handleRegistrationForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = e.target as typeof e.target & RegistrationFormInput;
      const results = await getGeocode({ address: formData.address.value });
      const { lat, lng } = getLatLng(results[0]);
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
    [router]
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
        <div className="relative object-contain w-full h-3/5 my-12">
          <Image
            src="/signup.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw"
            style={{ objectFit: "contain" }}
          />
        </div>
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
          onChange={handleFormCompletion}
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
            <Button
              name="Create Account"
              margin="mt-10 mb-3"
              width="w-1/2"
              type="submit"
              disabled={!isFormCompleted}
            />
          </div>
        </form>
        <div className="absolute bottom-5 text-sm">
          Already have an account?{" "}
          <Link href="/" className="text-blue hover:underline">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
