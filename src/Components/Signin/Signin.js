import React,{Component} from 'react';
import 'tachyons';

// const Signin = (props) => {

class Signin extends React.Component{

    //creating states
    //inorder to use props we have to pass props
    constructor(props){
        super(props);
        this.state={
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) =>{

        this.setState({signInEmail:event.target.value})
    }
    
    onPasswordChange = (event) =>{
        this.setState({signInPassword:event.target.value})
    }
    onSubmitSignIn = (event) =>{
        console.log(this.state);

        const data={email:this.state.signInEmail, password:this.state.signInPassword}


        fetch('https://arcane-lake-42222.herokuapp.com/signin',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })
        .then(response =>{
            if(response.ok)
            return response.json()
        })
        .then(user=>{
            if(user.id){ //does the user exist? Did we receive a user with id
                this.props.loadUser(user);
                this.props.onRouteChange('home')
            }
            else
             console.log(user);
        })
        .catch(err=>{
            console.log('Error occurred!');
        })
    }
    

   render()
   { 
       return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">

                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="bw1 b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                       
                        </div>
                        <div className="mv3">
                            
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="bw1 b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                       
                        </div>
                        <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                   
                    </fieldset>
                   
                    <div className="">
                        <input onClick={this.onSubmitSignIn} className=" bw1 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                    </div>
                   
                    <div className="lh-copy mt3">
                       
                        <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db pointer">Sign up</p>
                        <a href="#0" className="f6 link dim black db">Forgot your password?</a>
                    
                    </div>
                </div>
            </main>
        </article>
    )}
}

export default Signin;