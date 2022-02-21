import React from 'react'
import {BrowserRouter as Router, 
    Routes,
    Route,
    Navigate} 
    from 'react-router-dom';
import List from '../components/List';
import { Naveg } from '../components/Naveg';


export const AppRouter = () => {
    return (
        <div>
            <Router>
            <Naveg/>

                <Routes>
                    <Route path="/" element={<List/>}/>
                    {/* <Route path="/form" element={<Form/>}/> */}
                    <Route path="/*" element={<Navigate to="/"/>}/>
                </Routes>
            </Router>
        </div>
    )
}
