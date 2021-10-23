import React, {useEffect} from 'react';
import Sidenav from '../Sidenav/Sidenav'

function Home(props) {
    console.log('here');
    useEffect(() => {
        // window.location.reload()
    }, [])
    return (
        <div>
            <center>
                <Sidenav/>
                {/* <Classes/> */}
            </center>
        </div>
    );
}

export default Home;