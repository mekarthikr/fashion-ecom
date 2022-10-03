import Loading from '../components/retailer/loading';
import { toRelativeUrl } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerRetailer } from '../action/action';


const Secureroute = (child ) => {
  const { oktaAuth, authState } = useOktaAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authState) {
      return;
    }


    if (!authState.isAuthenticated) {
      const originalUri = toRelativeUrl(window.location.href, window.location.origin);
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }
    else {
      dispatch(registerRetailer({ email: authState.idToken.claims.email, name: authState.idToken.claims.name, role: "consumer" }))
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated,child]);

  if (!authState || !authState?.isAuthenticated) {return <Loading /> }
  else  
  return <>{child.children}</>

}

export default Secureroute;
