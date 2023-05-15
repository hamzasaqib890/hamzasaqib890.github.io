import { useState, useRef } from "react";
import contact from "/src/assets/contact.svg";
import layeredWaves from "/src/assets/waves-layered.svg";

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    setStatus("Sending...");
    e.preventDefault();
    const data = new FormData(formRef.current);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      formRef.current.reset();
      setStatus("Sent!");
      setTimeout(() => setStatus(""), 5000);
    });
  };

  return (
    <section className="bg-zinc-800 text-neutral-200 w-full relative">
      <img
        src={layeredWaves}
        className="min-w-[1800px] w-full object-center absolute bottom-full"
      />
      <div className="max-w-screen-2xl flex justify-center items-center mx-auto gap-16 p-16 pt-0">
        <div className="flex flex-col gap-5 w-1/2 max-w-xl justify-start">
          <h1 className="text-sm font-semibold whitespace-nowrap">
            Get In Touch
          </h1>
          <hr className=" border-t border-solid border-t-green-500" />
          <img src={contact} className="p-10 max-w-md self-center" />
        </div>
        <form
          method="POST"
          action="https://script.google.com/macros/s/AKfycbw6g8oZCGDEc3wKN3gVBJchqEGMz4qNuTFNgPcq8bNIPIWrs14yvuqyVLauELr3XC6h/exec"
          className="flex flex-col gap-5 grow text-[1rem]"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <input
            type="text"
            name="Name"
            placeholder="Name"
            required
            className="pl-6 pr-16 py-4 rounded-2xl bg-zinc-700 hover:bg-zinc-600 border border-solid border-cyan-500 focus:border-green-500 focus:outline-none bg-[url('/src/assets/icons/id.svg')] bg-[right_1.5rem_center] bg-no-repeat bg-[length:26px]"
          />
          <input
            type="email"
            name="Email"
            placeholder="Email"
            required
            className="pl-6 pr-16 py-4 rounded-2xl bg-zinc-700 hover:bg-zinc-600 border border-solid border-cyan-500 focus:border-green-500 focus:outline-none bg-[url('/src/assets/icons/envelope.svg')] bg-[right_1.5rem_center] bg-no-repeat bg-[length:26px]"
          />
          <textarea
            name="Message"
            placeholder="Message"
            className="pl-6 pr-16 py-4 rounded-2xl bg-zinc-700 hover:bg-zinc-600 h-52 resize-none border border-solid border-cyan-500 focus:border-green-500 focus:outline-none bg-[url('/src/assets/icons/chat_bubble.svg')] bg-[right_1.5rem_top_1rem] bg-no-repeat bg-[length:26px]"
          />
          <div className="flex items-center gap-8">
            <button
              type="submit"
              className="font-semibold bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl px-6 py-2 text-[1.2rem] w-fit hover:from-cyan-400 hover:to-green-400"
            >
              Send
            </button>
            <p>{status}</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
