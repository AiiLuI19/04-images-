// import { Component } from 'react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
function App() {
  const [imgName, setImgName] = useState('');

  const handleFormSubmit = imgName => {
    setImgName(imgName);
  };
  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imgName={imgName} />
      <ToastContainer autoClose={2000} />
    </>
  );
}
// class App extends Component {
//   state = {
//     imgName: '',
//   };

//   handleFormSubmit = imgName => {
//     console.log(imgName);
//     this.setState({ imgName });
//   };
//   render() {
//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery imgName={this.state.imgName} />
//         <ToastContainer autoClose={2000} />
//       </>
//     );
//   }
// }
export default App;
