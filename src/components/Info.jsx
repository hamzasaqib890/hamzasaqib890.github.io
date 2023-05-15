import "./Info.css";

const Info = () => {
  return (
    <section className="w-full h-full max-w-screen-2xl max-h-[768px] grid grid-cols-4 items-center p-16 gap-4 mx-auto mt-[25%] text-base">
      <div className="col-span-2 w-full h-full rounded-2xl uwaterloo p-8 flex flex-col justify-end">
        <div className="max-w-lg text-neutral-400">
          <h2>Studying</h2>
          <h2 className="text-neutral-200 font-semibold leading-snug">
            Computer Science
          </h2>
          <h2>at the University of Waterloo</h2>
        </div>
      </div>
      <div className="col-span-1 w-full h-full rounded-2xl fullstack p-8">
        <h2 className="text-neutral-200 font-semibold">Fullstack Developer</h2>
        <h2 className="text-neutral-400">with a focus on frontend</h2>
      </div>
      <div className="col-span-1 w-full h-full rounded-2xl graphics p-8 flex flex-col justify-end">
        <h2 className="text-neutral-400">Passionate about</h2>
        <h2 className="text-neutral-200 font-semibold">Computer Graphics</h2>
      </div>
    </section>
  );
};

export default Info;
