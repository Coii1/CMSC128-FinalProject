// function NotFound() {
//     return <div>
//         <h1>404 Not Found</h1>
//         <p>The page you're looking for doesn't exist!</p>
//     </div>
// }

// export default NotFound

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
        navigate('/home');
        }, 3000); // 3 seconds

        return () => clearTimeout(timer); // cleanup
    }, [navigate]);

    return <div>
        <h1>404</h1>
        <p>Page is not created yet, Redirecting...</p>
    </div>
}

export default NotFound