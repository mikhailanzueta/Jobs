import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import VerifiedModal from './verifiedModal';

function VerifyEmail() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Query the url for specific firebase parameters:
        const query = new URLSearchParams(window.location.search);
        const mode = query.get('mode')
        const actionCode = query.get('oobCode')
        
        // If the email link contains 'verifyEmail' and an action code:
        if (mode === 'verifyEmail' && actionCode) {
            setShowModal(true);
        }
    }, [])

    return (
        <>
          {/* Show the modal to the user and navigate them back to the signup page on click */}
          <VerifiedModal show={showModal} onClose={() => navigate('/Login')} />
        </>
      );
}

export default VerifyEmail;
