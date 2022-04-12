import './App.css';
import Logo from './Components/Logo/Logo'
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import React, { Component } from 'react';
// import Clarifai from 'clarifai';
import Register from './Components/Register/Register'
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
const particlesOptions1 = {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": false
      }
    },
    "size": {
      "value": 10,
      "random": true
    },
    "move": {
      "direction": "bottom",
      "out_mode": "out"
    },
    "line_linked": {
      "enable": false
    }
  },
  "interactivity": {
    "events": {
      "onclick": {
        "enable": true,
        "mode": "remove"
      }
    },
    "modes": {
      "remove": {
        "particles_nb": 10
      }
    }
  }
}
// model:'a403429f2ddf4b49b307e318f00e528b'
// const app = new Clarifai.App({
//   apiKey: 'd723c9a09000425b9fd0e16c885c8871'
// });

// console.log(Clarifai);
// var key='24ffc0c251484b1392e6b2cd24b86682'

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin', //this route variable will be used to decide in which we will be initially.
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    // password: '',
    entries: 0,
    joined: ''
  }

}
class App extends Component {

  constructor() {
    super();
    this.state = initialState
  }

  //componentDidMount() - lifecycle hook that comes with react for certain middle operations

  /*componentDidMount(){
    fetch('http://localhost:3000')
    .then(res => res.json())
    .then(data=>console.log(data))
  }*/

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        // password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    let obj = {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

    if (obj.leftCol != undefined && obj.rightCol != undefined && obj.topRow != undefined && obj.bottomRow != undefined)
      return obj;

    else
      return undefined

  }


  displayFaceBox(box) {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    // console.log(event.target.value.toLowerCase());
    // this.state.input = event.target.value.toLowerCase().trim();
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = (event) => {
    // console.log(this.state.input);
    //setting image url same as input data
    this.setState({ imageUrl: this.state.input });
    //using api function

    // if(this.state.input!='')
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)

    fetch('https://arcane-lake-42222.herokuapp.com/imageUrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then((dimensions) => {
    
        if (dimensions.status.description == 'Ok') {
          //adding entry
          fetch('https://arcane-lake-42222.herokuapp.com/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then((count) => {
              //updating entries inside nested user object
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(err => console.log("Error occurred", err))
        }
       
        this.displayFaceBox(this.calculateFaceLocation(dimensions));
      })
      .catch((err) => {
        console.log("Error occurred", err);
      })


  }

  //changes
  onRouteChange = (route) => {

    if (route === 'signin') {
      this.setState(initialState)
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({ route: route })

  }


  render() {

    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions1}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {this.state.route === 'register'
          ?
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : (
            this.state.route === 'signin' ?
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :
              <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
              </div>
          )

        }
      </div>
    );
  }
}

export default App;
