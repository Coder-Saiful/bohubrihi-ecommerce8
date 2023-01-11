import jwtDecode from 'jwt-decode';

export const authenticate = (token, cb) => {
    localStorage.setItem('jwt', JSON.stringify(token));
    cb();
}

export const isAuthenticated = () => {
    if (localStorage.getItem('jwt')) {
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        const {exp} = jwtDecode(jwt);
            if (new Date().getTime() <= exp * 1000) {
                return true;
            } else {
                localStorage.removeItem('jwt');
                return false;
            }
    } else {
        return false;
    }
}

export const userInfo = () => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const decoded = jwtDecode(jwt);
    return {...decoded, token: jwt};
}

export const logout = cb =>  {
    localStorage.removeItem('jwt');
    cb();
}