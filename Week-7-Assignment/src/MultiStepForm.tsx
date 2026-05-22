import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required"),

    lastName: z
      .string()
      .min(1, "Last name is required"),

    dob: z
      .string()
      .min(1, "Date of birth is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);


  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formValues = watch();


  const validateStep1 = async () => {
    return await trigger([
      "firstName",
      "lastName",
      "dob",
    ]);
  };

  const validateStep2 = async () => {
    return await trigger([
      "email",
      "password",
      "confirmPassword",
    ]);
  };


  const nextStep = async () => {
    if (step === 1) {
      const valid = await validateStep1();

      if (valid) {
        setStep(2);
      }
    }

    if (step === 2) {
      const valid = await validateStep2();

      if (valid) {
        setStep(3);
      }
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };


  const onSubmit = (data: FormValues) => {
    console.log("Submitted Data:", data);

    alert("Form submitted successfully!");
  };


  const isStep1Valid =
    formValues.firstName &&
    formValues.lastName &&
    formValues.dob &&
    !errors.firstName &&
    !errors.lastName &&
    !errors.dob;

  const isStep2Valid =
    formValues.email &&
    formValues.password &&
    formValues.confirmPassword &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
        
        <div className="flex items-center justify-between mb-10">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
              ${
                step >= item
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-800">
                Personal Info
              </h2>

              <div>
                <label className="block mb-2 font-medium">
                  First Name
                </label>

                <input
                  type="text"
                  placeholder="Mohit"
                  {...register("firstName")}
                  className={`w-full border rounded-lg px-4 py-3 outline-none
                  ${
                    errors.firstName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Last Name
                </label>

                <input
                  type="text"
                  placeholder="Chaudhary"
                  {...register("lastName")}
                  className={`w-full border rounded-lg px-4 py-3 outline-none
                  ${
                    errors.lastName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Date of Birth
                </label>

                <input
                  type="date"
                  {...register("dob")}
                  className={`w-full border rounded-lg px-4 py-3 outline-none
                  ${
                    errors.dob
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dob.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={!isStep1Valid}
                  onClick={nextStep}
                  className={`px-6 py-3 rounded-lg text-white transition
                  ${
                    isStep1Valid
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-800">
                Account Details
              </h2>

              <div>
                <label className="block mb-2 font-medium">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="cmmohitchau@example.com"
                  {...register("email")}
                  className={`w-full border rounded-lg px-4 py-3 outline-none
                  ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="********"
                  {...register("password")}
                  className={`w-full border rounded-lg px-4 py-3 outline-none
                  ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="********"
                  {...register("confirmPassword")}
                  className={`w-full border rounded-lg px-4 py-3 outline-none
                  ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={!isStep2Valid}
                  onClick={nextStep}
                  className={`px-6 py-3 rounded-lg text-white transition
                  ${
                    isStep2Valid
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Review & Submit
              </h2>

              <div className="bg-gray-50 border rounded-xl p-5 space-y-3">
                <div>
                  <span className="font-semibold">
                    First Name:
                  </span>{" "}
                  {formValues.firstName}
                </div>

                <div>
                  <span className="font-semibold">
                    Last Name:
                  </span>{" "}
                  {formValues.lastName}
                </div>

                <div>
                  <span className="font-semibold">
                    Date of Birth:
                  </span>{" "}
                  {formValues.dob}
                </div>

                <div>
                  <span className="font-semibold">
                    Email:
                  </span>{" "}
                  {formValues.email}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={!isValid}
                  className={`px-6 py-3 rounded-lg text-white transition
                  ${
                    isValid
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;