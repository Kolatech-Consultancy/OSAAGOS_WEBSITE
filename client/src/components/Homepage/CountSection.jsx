import { FaUserGroup } from "react-icons/fa6";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { useEffect, useMemo, useRef, useState } from "react";

function CountSection() {
  const targets = useMemo(
    () => [
      { count: 1500, label: "Users", element: <FaUserGroup /> },
      {
        count: 1600,
        label: "Photos",
        element: <MdOutlineAddPhotoAlternate />,
      },
      { count: 487, label: "Events", element: <MdEvent /> },
      { count: 670, label: "Awards", element: <FaAward /> },
    ],
    []
  );

  const [counts, setCounts] = useState(targets.map(() => 0));
  const counterRefs = useRef([]);

  useEffect(() => {
    const countUp = (index) => {
      let current = 0;
      const target = targets[index].count;
      const increment = target / 50;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          setCounts((prevCounts) =>
            prevCounts.map((count, i) =>
              i === index ? Math.floor(current) : count
            )
          );
          requestAnimationFrame(updateCounter);
        } else {
          setCounts((prevCounts) =>
            prevCounts.map((count, i) => (i === index ? target : count))
          );
        }
      };

      updateCounter();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            countUp(Number(index));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      counterRefs.current?.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [targets]);

  return (
    <div className="py-12 bg-blue-950 text-white grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 px-8 gap-8 md:px-12">
      {targets.map((ele, index) => {
        return (
          <article
            className="flex gap-8 items-center justify-center"
            ref={(el) => (counterRefs.current[index] = el)}
            key={ele.label}
            data-index={index}
          >
            <span className="text-6xl">{ele.element}</span>
            <div>
              <h2 className="text-3xl leading-5">{counts[index]}</h2>
              <p className="text-xl capitalize">{ele.label}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default CountSection;
