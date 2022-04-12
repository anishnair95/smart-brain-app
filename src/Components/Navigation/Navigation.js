import React from 'react';
import 'tachyons';
const Navigation = (props) => {

    if (props.isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => props.onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        )
    }
    else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => props.onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Signin</p>
                <p onClick={() => props.onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
        )
    }
}

export default Navigation;
// return (
//     <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
//         {
//           (props.cond==='signin' || props.cond==='register')?
//              <p onClick={()=>this.onRouteChange('home')}className='f3 link dim black underline pa3 pointer'>Login</p>
//                    :
//              <p onClick={()=>props.onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>   
              
//         }
//     </nav>
// )

