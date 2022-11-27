import Magazine from "./components/Magazine";
import "./App.css";
import { useState } from "react";
import magazineSource from "./sourceData";
import { MagazineType } from "./models";

function App() {
  const [magazinesData, setMagazinesData] = useState<MagazineType[]>(
    magazineSource.data.magazines
  );

  // Create a useState to store which item is currently shown on the screen
  const [currentIssue, setCurrentIssue] = useState<undefined | string>();

  // Find the current shown item in database and return it's background-color 
  function getColor() {
    const currentMagazine = magazinesData.find(
      (issue) => issue.name === currentIssue
    );
    const currentColor = currentMagazine?.background_color;
    return currentColor;
  }

  return (
    // pass the dynamic background color in parent div
    // so that the background color can change when different item is shown
    <div
      className={`${getColor()} transition-all duration-500 w-full lg:w-screen lg:h-screen max-lg:flex max-lg:flex-col max-lg:items-center max-lg:p-4 `}
    >  
      {/* logo */}
      <h1 className="uppercase text-xl w-fit place-self-start lg:text-4xl lg:fixed lg:top-2 lg:left-3 font-poppins font-bold z-40 ">
        Movies talks
      </h1>

      {/* Magazines Section */}
      {/* CHALLENGE!!! */}
      {/* Below code is vertical snap*/}
      {/* to achieve this we need to set the scrollbar to the parent div with a class "snap-y" instead of html body */}
      {/* add overflow-hidden the body or html in css file */}
      {/* add overflow-y-scroll and height to the snap parent div */}
      {/* be mindful that height is not set to fit all the content */}
      {/* in this case, height is only set to screen size */}
      <div
        className={` lg:snap-y snap-mandatory lg:overflow-y-scroll w-screen lg:h-screen lg:no-scrollbar motion-safe:scroll-smooth`}
      >
        {magazinesData.map((magazine) => {
          return (
            <Magazine
              key={magazine.id}
              url={magazine.url}
              name={magazine.name}
              background_color={magazine.background_color}
              setCurrentIssue={setCurrentIssue}
            />
          );
        })}
      </div>

      {/* bottom-left text */}
      <div className="font-semibold font-poppins w-4/5 max-lg:font-light max-lg:mt-4 lg:w-1/5 lg:text-left lg:fixed bottom-2 left-3 z-40">
        <p className=" text-lg">
          Movie Talks is a list of casual, but in depth dialogues on
          movies. Our decisions shape and influence this complex
          world—to have a chance to watch the right ones, we need to watch.
        </p>
        <p className="text-xs text-black/75 mt-1">
          © {new Date().getFullYear()}{" "}
          <span className="underline">Published by let_woon</span>
        </p>
        <div className="mt-3">
          <a className="text-sm underline" href="#">
            Privacy Policy
          </a>
        </div>
      </div>

      {/* left link */}
      <div className="flex flex-col justify-between py-4 lg:fixed top-0 right-3 lg:h-screen z-40">
        <a className="font-poppins font-semibold text-lg text-right" href="#">
          info@moviestalks.com
        </a>
        <div className=" max-lg:hidden flex flex-col text-xl font-poppins text-right items-end">
          {magazinesData.map((magazine) => {
            return (
              <a
                className={`${
                  currentIssue === magazine.name && " font-bold "
                } hover:text-white w-fit`}
                key={magazine.id}
                href={`#${magazine.name}`}
              >
                {magazine.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
