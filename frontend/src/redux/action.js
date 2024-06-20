export const signupRequest = (userData) => ({
    type: 'auth/signupRequest',
    payload: userData,
});

export const signupSuccess = (user) => ({
    type: 'auth/signupSuccess',
    payload: user,
});

export const signupFailure = (error) => ({
    type: 'auth/signupFailure',
    payload: error,
});

export const loginRequest = (payload) => ({
    type: 'auth/loginRequest',
    payload
});

export const loginSuccess = (data) => ({
    type: 'auth/loginSuccess',
    payload: data,
});

export const loginFailure = (error) => ({
    type: 'auth/loginFailure',
    payload: error,
});

// export const logoutRequest = () => ({
//     type: 'auth/logoutRequest',
// });

// export const forgotPasswordRequest = (email) => ({
//     type: 'auth/forgotPasswordRequest',
//     payload: email,
// });

// export const forgotPasswordSuccess = () => ({
//     type: 'auth/forgotPasswordSuccess',
// });

// export const forgotPasswordFailure = (error) => ({
//     type: 'auth/forgotPasswordFailure',
//     payload: error,
// });

// export const changePasswordRequest = (newPasswordData) => ({
//     type: 'auth/changePasswordRequest',
//     payload: newPasswordData,
// });

// export const changePasswordSuccess = () => ({
//     type: 'auth/changePasswordSuccess',
// });

// export const changePasswordFailure = (error) => ({
//     type: 'auth/changePasswordFailure',
//     payload: error,
// });
