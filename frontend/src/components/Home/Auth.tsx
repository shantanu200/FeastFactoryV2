import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';



const Auth = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)

    return (
        isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />
    )
}

export default Auth