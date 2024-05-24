import { useState, useEffect } from 'react';

const useUserType = () => {
    const [userType, setUserType] = useState();

    useEffect(() => {
        const handleResize = () => {
            
            /* IS USER EXISTED IN STORAGE */  
            
            /* 
                PSEUDO CODE
                
            } */
            
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return userType;
}

export default useUserType;