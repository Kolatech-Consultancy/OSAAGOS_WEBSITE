import { useEffect, useState } from "react";

export function useToggleDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = (index, event) => {
        event.stopPropagation();
        setIsOpen((prev) => (prev === index ? null : index));
    };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                setIsOpen(null);
            }
        };
    
        window.addEventListener('click', handleClickOutside);
    
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return{
        toggleDropdown,
        isOpen
    }
}