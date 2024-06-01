import {useState, createContext, useEffect} from 'react'

const UserContext = createContext({email: '', name: '', auth:false, roles: []});
const UserProvider = ({children}) => {
    const [user, setUser] = useState({email: '', name: '', auth:false, roles: []});

    useEffect(() => {
        const name = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        console.log("name: ", name);
        if(name !== "null" && email !== "null" && token !== "null")
            login(email, name, token);
        else 
            logout();
    },[])

    const login = (email, username, token, roles) => {
        setUser((user) => ({
            email: email,
            name: username,
            auth: true,
            roles: roles
        }));
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("roles", roles);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem("email");
        localStorage.removeItem("roles")
        setUser((user) => ({
            email: '',
            name: '',
            auth: false,
            roles: []
        }))
    }

    return( 
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProvider};

