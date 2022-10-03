import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';

const Loading = () => {
  const { oktaAuth, authState } = useOktaAuth();
  useEffect(() => {
    if (!authState) {
      return;
    }
    if (authState.isAuthenticated === true) {
      oktaAuth.signOut();
    }
  }, [authState, oktaAuth])
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border mt-5" style={{ width: "15rem", height: "15rem" }} role="status">

        </div>
      </div>
      <h2 className='d-flex justify-content-center mt-5'>Please Wait</h2>
    </>

  );
};

export default Loading;