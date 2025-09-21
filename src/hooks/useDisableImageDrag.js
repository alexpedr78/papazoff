import { useEffect } from "react";

export default function useDisableImageDrag() {
  useEffect(() => {
    const handleDragStart = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);
}
