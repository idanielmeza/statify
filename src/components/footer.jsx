import React from 'react';

const Footer = () => {

    const year = new Date().getFullYear();

    return (  
        <footer className="footer-pagina">
        <div className="text-center p-4">
            <p className="text-reset fw-bold" href="#"> Desarrolado por LedezmaDev</p>
            © {year} Statify
        </div>
        </footer>
    );
}
 
export default Footer;