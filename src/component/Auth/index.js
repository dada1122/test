import React from '@alipay/bigfish/react';

const check = ({ or, and, userAuth }) => {
  let match;
  if (or) {
    or.forEach(auth => {
      if (userAuth.indexOf(auth) >= 0) {
        match = true;
      }
    });
  } else {
    match = true;
    and.forEach(auth => {
      if (userAuth.indexOf(auth) < 0) {
        match = false;
      }
    });
  }
  return match;
};

class Auth extends React.Component {
  render() {
    const { or, and, userAuth, noAuth, children } = this.props;
    const match = check({ or, and, userAuth });
    return (match ? children : noAuth) || null;
  }
}

export { check };

export default Auth;
