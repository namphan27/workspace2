import { useEffect, useRef, useState } from "react";

export default function () {
  const isResizingRef = useRef(false);
  const [width, setWidth] = useState(200);

  const handleMouseDown = () => {
    isResizingRef.current = true;
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizingRef.current) return;

      let x = e.clientX;
      if (x < 180) x = 180;
      if (x > 350) x = 350;

      setWidth(x);
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      document.body.style.userSelect = "auto";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <main className="flex h-screen">
      <div
        style={{ width }}
        className="bg-gray-200 h-full top-0 left-0 bottom-0 absolute group"
      >
        <h2>Sidebar</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi vel, similique laborum atque sequi voluptatem dicta exercitationem recusandae, nam hic iste repellendus facilis. Tempore harum dignissimos ut saepe deserunt explicabo.</p>
        <div
          onMouseDown={handleMouseDown}
          className="absolute top-0 right-0 bottom-0 w-[5px]
                     bg-gray-500 cursor-ew-resize
                     opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="flex-1 absolute top-0 bottom-0">
        <h1 className="text-center">Notion</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero animi eum architecto iusto, optio, perferendis doloremque aspernatur accusantium explicabo similique culpa, praesentium laboriosam. Mollitia, cupiditate! Vitae nisi debitis alias. Dolorem.</p>
      </div>
    </main>
  );
}
