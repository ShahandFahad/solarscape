import React, { useState } from "react";
import sun from "../assets/images/sun.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendUserFeedback } from "../service/api";

// Contact component
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // notifier
  const notify = (message) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // One liner for form handling
  const handleForm = (e) => {
    setForm((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleFeedbackSubmission = async () => {
    // filed validation : Check Empty
    if (!form.name || !form.email || !form.subject || !form.message) {
      notify("All fields should be filled");
      return;
    }
    // Send feedback
    try {
      const response = await sendUserFeedback(form);
      notify("Thankyou for your feedback.");
    } catch (error) {
      notify("Feedback Not Sent. Try Again.");
    }
  };
  return (
    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 sm:p-10">
      <ToastContainer />
      <div className="max-w-md">
        <div className="flex items-center space-x-5">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
            <img className="bg-white" alt="Logo" src={sun} />
          </div>
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed">Contact</h2>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">
              Please contact us in case you need any additional information
              about Solar Scape.
            </p>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-row gap-10">
              <label className="leading-loose w-10">Name</label>
              <input
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Name"
                name="name"
                onChange={handleForm}
              />
            </div>
            <div className="flex flex-row gap-10">
              <label className="leading-loose w-10">Email</label>
              <input
                type="email"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Email address"
                name="email"
                onChange={handleForm}
              />
            </div>
            <div className="flex flex-row gap-10">
              <label className="leading-loose w-10">Subject</label>
              <input
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Optional"
                name="subject"
                onChange={handleForm}
              />
            </div>
            <div className="flex flex-row gap-10">
              <label className="leading-loose w-10">Message</label>
              <textarea
                rows="5"
                className="block px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Message"
                name="message"
                onChange={handleForm}
              ></textarea>
            </div>
          </div>
          <div className="pt-4 flex items-center space-x-4">
            <button
              onClick={handleFeedbackSubmission}
              style={{ background: "#f76b1c" }}
              className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
