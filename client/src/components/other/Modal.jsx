import React from "react";
import { IoClose } from "react-icons/io5";

function Modals({ title, message, children, className, funcOK, isVisible }) {
  const [showModal, setShowModal] = React.useState(isVisible);

  React.useEffect(() => {
    setShowModal(isVisible);
  }, [isVisible]);

  if (!showModal) {
    return null;
  }
  const handleFunctionOK = async () => {
    if (funcOK) {
      await funcOK();
    }
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className={`modal-box relative rounded-md p-3 ${className}`}>
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={() => setShowModal(false)}
        >
          <IoClose />
        </button>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="">
          {message}
          <br />
        </p>
        {children}
        <div className="modal-action flex justify-end">
          {funcOK && (
            <button className="btn" onClick={handleFunctionOK}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modals;
