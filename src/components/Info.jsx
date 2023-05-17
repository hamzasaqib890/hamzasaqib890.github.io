import "./Info.css";

const Info = () => {
  return (
    <section className="w-full sm:h-full sm:max-h-[768px] mt-[25%] bg-gradient-to-b from-transparent to-zinc-900 to-15%">
      <div className="max-w-screen-2xl h-full grid grid-cols-1 grid-rows-3 sm:grid-cols-2 sm:grid-rows-none xl:grid-cols-4 items-center p-8 md:p-16 gap-4 mx-auto text-base">
        <div className="col-span-1 row-span-1 sm:col-span-2 sm:row-auto w-full h-full rounded-2xl uwaterloo p-8 flex flex-col justify-end md:justify-end ">
          <div className="max-w-lg text-neutral-400">
            <h2>Studying</h2>
            <h2 className="text-neutral-200 font-semibold leading-snug">
              Computer Science
            </h2>
            <h2>at the University of Waterloo</h2>
          </div>
        </div>
        <div className="col-span-1 row-span-1 sm:row-auto w-full h-full rounded-2xl fullstack p-8 flex flex-col justify-start md:justify-start">
          <h2 className="text-neutral-200 font-semibold">
            Fullstack Developer
          </h2>
          <h2 className="text-neutral-400">with a focus on frontend</h2>
        </div>
        <div className="col-span-1 row-span-1 sm:row-auto w-full h-full rounded-2xl graphics p-8 flex flex-col justify-start md:justify-end">
          <h2 className="text-neutral-400">Passionate about</h2>
          <h2 className="text-neutral-200 font-semibold">Computer Graphics</h2>
        </div>
      </div>
    </section>
  );
};

export default Info;
