import { useState, useRef, useContext } from "react";
import "./styles.css";
import { LocaleContext } from "./I18NResume";

export default function CollapsibleSection({
  id,
  heading,
  children,
}: React.PropsWithChildren<{ id: string; heading: string }>) {
  const localeContext = useContext(LocaleContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(true);
  const onTransitionEnd = () => {
    if (!contentRef.current) {
      return;
    }
    contentRef.current.removeEventListener("transitionend", onTransitionEnd);
    setOpen(!isOpen);
  };
  const toggleOpen = () => {
    const contents = contentRef.current;
    if (!contents) {
      return;
    }
    if (isOpen) {
      const height = contents.getBoundingClientRect().height;
      contents.style.height = height + "px";
      // Trigger a DOM reflow. See https://www.harrytheo.com/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
      contents.offsetHeight;
      contents.classList.add("collapsing");
      contents.style.height = "";
    } else {
      const height = contents.scrollHeight;
      contents.style.height = height + "px";
    }
    contents.addEventListener("transitionend", onTransitionEnd);
  };

  const downCaret = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={localeContext.strings.expand}
      fill="none"
      height={24}
      width={24}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );

  const upCaret = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={localeContext.strings.collapse}
      fill="none"
      height={24}
      width={24}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );

  return (
    <section className="mb-4 md:mb-6 last:lg:mb-0">
      <h2 className="flex place-content-between border-b-2 border-indigo-500 font-medium text-xl md:text-2xl mb-2 uppercase text-indigo-500">
        {heading}
        <button
          className="hover:text-indigo-300"
          onClick={toggleOpen}
          aria-controls={id}
          aria-expanded={isOpen ? "true" : "false"}
        >
          {isOpen ? upCaret : downCaret}
        </button>
      </h2>
      <div
        id={id}
        ref={contentRef}
        className="overflow-hidden duration-200 ease-out"
        style={{ height: isOpen ? "auto" : "0px" }}
      >
        {children}
      </div>
    </section>
  );
}
