import { useEffect, useState } from "react";
import Fog from "../ui/Fog";
import { FaTimes } from "react-icons/fa";

export default function TallyForm() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem("tallyFormShown");
    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowForm(true);
        localStorage.setItem("tallyFormShown", "true");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeForm = () => {
    setShowForm(false);
    localStorage.setItem("tallyFormShown", "true");
  }

  if (!showForm)
    return null;
  return (
    <Fog>
      <>
        <iframe
          src="https://tally.so/popup/mRPEgP?originPage=%2Fcontact&amp;alignLeft=1"
          frameBorder="0"
          marginheight="0"
          marginwidth="0"
          title="Tally Forms"
          className="w-full w-[400px] h-[800px]"
          data-tally-embed-widget-initialized="1"
          id="iFrameResizer0"
          scrolling="yes" />
        <a className="absolute cursor-pointer block w-fit top-6 right-6" onClick={closeForm}>
          <FaTimes className="text-2xl text-gray-600" />
        </a>
      </>
    </Fog>
  );
}