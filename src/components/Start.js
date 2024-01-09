// import React, { useContext } from 'react';
// import DataContext from '../context/dataContext';
// import bgImage from '../home.png';
// import logoImage from '../logo (2).png';
// import Image from 'react-bootstrap/Image';

// const backgroundImageStyle = {
//     backgroundImage: `url("${bgImage}")`,
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     height: '100vh',
//     display: 'block',
// };

// const logoStyle = {
//     backgroundImage: `url("${logoImage}")`,
//     backgroundSize: 'contain',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     width: '100%', // Adjust the width as needed
//     height: '200px', // Adjust the height as needed
//     margin: '0 auto', // Center the logo horizontally
//     marginBottom: '20px', // Add margin to separate the logo from the title
//     marginTop: '-140px', // Add margin to separate the logo from the title
//     zIndex: '100',
// };

// const headingStyle = {
//     color: 'white',
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Adding a subtle shadow
// };

// const Start = () => {
//     const { startQuiz, showStart } = useContext(DataContext);

//     return (
//         <div className="" >
//         <section className='text-white text-center bg-dark bg' style={{ ...backgroundImageStyle, display: `${showStart ? 'block' : 'none'}` }}>
//             <div className="container">
                
//                 <div className="row vh-100 align-items-center justify-content-center">
//                     <div style={logoStyle}></div>
//                     <div className="col-lg-8">
//                         <h2 style={headingStyle}>Know The Burning Cosmos</h2>
//                         <button onClick={startQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold mt-3">Start Quiz</button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//         </div>
//     );
// };

// export default Start;

// import React, { useContext } from 'react';
// import DataContext from '../context/dataContext';
// import bgImage from '../home.png';
// import logoImage from '../logo (2).png';
// import Image from 'react-bootstrap/Image';

// const backgroundImageStyle = {
//     backgroundImage: `url("${bgImage}")`,
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     height: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'center',
// };

// const logoStyle = {
//     backgroundImage: `url("${logoImage}")`,
//     backgroundSize: 'contain',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     width: '100%', // Adjust the width as needed
//     height: '200px', // Adjust the height as needed
//     margin: '0 auto', // Center the logo horizontally
//     marginBottom: '20px', // Add margin to separate the logo from the title
//     marginTop: '-140px', // Add margin to separate the logo from the title
//     zIndex: '100',
// };


// const headingStyle = {
//     color: 'white',
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Adding a subtle shadow
// };

// const Start = () => {
//     const { startQuiz, showStart } = useContext(DataContext);

//     return (
//         <div className="" >
//         <section className='text-white text-center bg-dark bg' style={{ ...backgroundImageStyle, display: `${showStart ? 'block' : 'none'}` }}>
//             <div className="container">
//                 <div className="row vh-100 align-items-center justify-content-center">
//                     <div style={logoStyle}></div>
//                     <div className="col-lg-8">
//                         <h2 style={headingStyle}>Know The Burning Cosmos</h2>
//                         <button onClick={startQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold mt-3">Start Quiz</button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//         </div>
//     );
// };

// export default Start;




import React, { useContext, useState, useEffect } from 'react';
import DataContext from '../context/dataContext';
import logoImage from '../logo (2).png';
import mobileBgImage from '../home2.png';
import desktopBgImage from '../home.png';

const Start = () => {
    const { startQuiz, showStart } = useContext(DataContext);
    const [bgImage, setBgImage] = useState(window.innerWidth > 600 ? desktopBgImage : mobileBgImage);

    const updateBgImage = () => {
        setBgImage(window.innerWidth > 600 ? desktopBgImage : mobileBgImage);
    };

    useEffect(() => {
        window.addEventListener('resize', updateBgImage);
        return () => window.removeEventListener('resize', updateBgImage);
    }, []);

    const backgroundImageStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const logoStyle = {
        backgroundImage: `url("${logoImage}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%', // Adjust the width as needed
        height: '200px', // Adjust the height as needed
        margin: '0 auto', // Center the logo horizontally
        marginBottom: '20px', // Add margin to separate the logo from the title
        marginTop: '-140px', // Add margin to separate the logo from the title
        zIndex: '100',
    };

    const headingStyle = {
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Adding a subtle shadow
    };

    return (
        <div className="">
            <section className='text-white text-center bg-dark bg' style={{ ...backgroundImageStyle, display: `${showStart ? 'block' : 'none'}` }}>
                <div className="container">
                    <div className="row vh-100 align-items-center justify-content-center">
                        <div style={logoStyle}></div>
                        <div className="col-lg-8">
                            <h2 style={headingStyle}>Know The Burning Cosmos</h2>
                            <button onClick={startQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold mt-3">Start Quiz</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Start;

