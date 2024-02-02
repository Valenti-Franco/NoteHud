import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {

  const Svg = () => (
    <svg viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style={{ fill: "#273B7A" }} cx="256" cy="256" r="256"></circle> <path style={{ fill: "#121149" }} d="M188.768,253.988l-70.011,91.124l165.347,165.347c110.392-12.055,199.68-94.284,222.322-201.14 L356.657,159.551L338.13,186.33l-56.734-56.734l-39.226,0.534l-16.115,16.113l-4.884,52.867l-1.372,12.355l-24.71,25.571 L188.768,253.988z"></path> <rect x="128.098" y="159.542" transform="matrix(-0.9949 -0.1005 0.1005 -0.9949 425.0694 536.3963)" style={{ fill: "#FEE187" }} width="195.897" height="195.897"></rect> <rect x="160.754" y="159.547" style={{ fill: "#EAA22F" }} width="195.905" height="195.905"></rect> <rect x="254.569" y="159.547" style={{ fill: "#FF5419" }} width="102.09" height="195.905"></rect> <path style={{ fill: "#FFFFFF" }} d="M242.381,262.447c-11.729,0-21.273-9.544-21.273-21.273v-81.624c0-20.73,16.867-37.598,37.598-37.598 s37.598,16.867,37.598,37.598h-9.895c0-15.276-12.426-27.701-27.701-27.701s-27.705,12.424-27.705,27.701v81.623 c0,6.275,5.103,11.378,11.378,11.378s11.378-5.103,11.378-11.378v-81.623h9.895v81.623 C263.652,252.904,254.109,262.447,242.381,262.447z"></path> </g></svg>

  )
  return (
    <div className="w-full light light:bg-gray-100 light:text-black bg-black text-white dark dark:bg-gray-900 dark:text-white bg-white text-black">
      <div className="container h-dvh m-auto flex justify-between  ">

        <div className="flex flex-col-reverse justify-end xl:justify-start   xl:flex-col ">
          <div className="flex xl:flex-row flex-col">
            <div className="flex flex-col items-center justify-center w-full  xl:w-1/2">
              <h1 className="text-3xl xl:text-6xl p-8 px-12 text-pretty font-bold">Welcome to the <span className="text-blue-500">N</span>ote<span className="text-blue-500">H</span>ud </h1>
              <p className="p-8 px-12 text-md  xl:text-xl text-pretty">Unlock the full potential of your note-taking experience with our intuitive platform. Seamlessly create, edit, and organize your notes, harnessing the power of tagging and filtering. Dive into a world of productivity as you effortlessly manage both active and archived notes.</p>
            </div>
            <div className="flex m-auto my-6  w-1/3  xl:w-1/4">
              <Svg />

            </div>
          </div>
          <div className="flex m-10 justify-center items-center">
            <Link href="/Dashboard">
              <Button size="lg" className=" text-xl" color="primary" variant="shadow">Get Started</Button>

            </Link>
          </div>
          <div className="flex  justify-center w-full">
            <div className="flex flex-col justify-start items-center">
              <h1 className="text-3xl p-8  text-pretty font-bold">Notes Mastery</h1>
              <div className="hidden xl:flex  gap-2 justify-center items-center flex-wrap">
                <div className="w-1/5 text-center">
                  <p className="text-xl">Effortless notes: Tag, filter, done!</p>
                </div>
                <Divider className="my-1 bg-gray-500 opacity-60 rounded-md" orientation="vertical" />

                <div className="w-1/5 text-center ">
                  <p className="text-xl">Tag for clarity, filter for focus.</p>
                </div>
                <Divider className="my-1 bg-gray-500 opacity-60 rounded-md" orientation="vertical" />

                <div className="w-1/5 text-center">
                  <p className="text-xl">Organize notes, Every Day.</p>
                </div>
                <Divider className="my-1 bg-gray-500 opacity-60 rounded-md" orientation="vertical" />

                <div className="w-1/5 text-center">
                  <p className="text-xl">Tagging magic for note perfection.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
