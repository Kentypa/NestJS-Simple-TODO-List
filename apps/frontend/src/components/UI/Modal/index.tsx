import { createPortal } from "react-dom";
import { ComponentWithChildren } from "../../../types/components-with-children";
import { memo } from "react";

type ModalProps = {
  visible: boolean;
  toggleModal: () => void;
  backgroundClassName: string;
};

export const Modal: ComponentWithChildren<ModalProps> = memo(
  ({ visible, backgroundClassName, children, toggleModal }) => {
    return (
      <>
        {visible &&
          createPortal(
            <div className={backgroundClassName} onClick={toggleModal}>
              <div className="contents" onClick={(e) => e.stopPropagation()}>
                {children}
              </div>
            </div>,
            document.body
          )}
      </>
    );
  }
);
