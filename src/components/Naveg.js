import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../style/navStyle.css'


export const Naveg = () => {
  return (
           <div className="header">
             <nav>
                    <Link className="link" to="/">Tiendita</Link>

                    <select>
                        <option>Selecciona tu Ubicacion</option>
                        <option>Mexico D.f</option>
                        <option>Buenos Aires</option>
                        <option>Bogotá</option>
                    </select>
                    <Link   className="link" to="/form"><Button   variant="success"  > Carrito </Button></Link>
                </nav>
            </div>   
  )
}