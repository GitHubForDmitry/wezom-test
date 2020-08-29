import React from 'react';

function PrivateRoute({component: RouteComponent, ...rest}) {

    // const { currentUser } = useContext(AppContext)

    return (
        <div></div>
        // <Route
        //     {...rest}
        //     render={routeProps =>
        //     !!currentUser ?
        //         (<RouteComponent {...routeProps} />)
        //         :
        //         (<Redirect to={'/'} />)
        //     }
        // />
    );
}

export default PrivateRoute;