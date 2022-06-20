import React from 'react';

const Footer = () => {

    const year = new Date().getFullYear();

    return (  
        <footer className="footer-pagina">
        <div className="text-center p-4">
            <p className="text-reset fw-bold" href="#"> Developed by LedezmaDev</p>
             Statify © {year}
        </div>
        </footer>
    );
}
 
export default Footer;