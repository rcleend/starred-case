import { useState, useEffect } from "react";
import { toast } from "./use-toast";

interface UseConfettiProps {
  duration?: number;
}

export function useConfetti({ duration = 7000 }: UseConfettiProps = {}) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Set initial dimensions
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const trigger = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
    toast({
      variant: "default",
      title: "Wow! You're hired",
    });
  };

  return {
    dimensions,
    isVisible,
    trigger,
  };
}
