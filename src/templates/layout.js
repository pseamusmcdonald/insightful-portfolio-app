import React from 'react';

const Layout = ({children}) => {

    return (
        <React.Fragment>
            <h1>header</h1>
            <main>{children}</main>
            <h1>footer</h1>
        </React.Fragment>
    )
}

export default Layout;