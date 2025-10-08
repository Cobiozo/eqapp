import { useState, useEffect } from 'react';

export default function useScroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: Event) => {
    const scrolled = document.scrollingElement!.scrollTop;
    if (scrolled >= 10){
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return isScrolled;
}

