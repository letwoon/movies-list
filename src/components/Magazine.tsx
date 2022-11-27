import { useInView } from "react-intersection-observer";

interface MagazineProps {
  url: string;
  name: string;
  background_color: string;
  setCurrentIssue: React.Dispatch<React.SetStateAction<undefined | string>>;
}

function Magazine({ url, name, setCurrentIssue }: MagazineProps) {
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
    // at what percentage of the target's visibility the observer's callback should be executed
  });

  // If current item is shown on screen, pass back the item id to parent component
  if (inView) {
    setCurrentIssue(entry?.target.id)
  }
  
  return (
    <div
      ref={ref} // for monitor this div when it shown on screen
      id={name}
      className={` snap-center h-screen relative flex justify-center items-center`}
    >
      <div className="w-[420px] h-full flex flex-col justify-center items-center">
        <img className="w-[320px] h-[470px] object-center shadow-lg rounded-lg" src={url} alt="" />
        <h2 className="font-poppins uppercase text-2xl font-bold mt-2">{name}</h2>
        <p className="font-poppins text-base font-bold text-black hover:underline cursor-pointer mt-2">
          TRAILER
        </p>
      </div>
    </div>
  );
}

export default Magazine;
