import PropTypes from 'prop-types';
// import { Component } from 'react';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit, onChange }) => {
  const [imgName, setImgName] = useState('');

  const handleNameChange = e => {
    setImgName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (imgName.trim() === '') {
      return toast.info('Add name img');
    }

    onSubmit(imgName);
    setImgName('');
  };

  return (
    <header className={s.searchbar}>
      <form onSubmit={handleSubmit} className={s.form}>
        <button type="submit" className={s.button} aria-label="search button">
          <BsSearch size={20} />
        </button>

        <input
          type="text"
          autoComplete="off"
          value={imgName}
          onChange={handleNameChange}
          autoFocus
          name="imgName"
          placeholder="Search images and photos"
          className={s.input}
        />
      </form>
    </header>
  );
};

// class Searchbar extends Component {
//   state = {
//     imgName: '',
//   };
//   handleNameChange = e => {
//     this.setState({ imgName: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();

//     if (this.state.imgName.trim() === '') {
//       return toast.info('Add name img');
//     }

//     this.props.onSubmit(this.state.imgName);
//     this.setState({ imgName: '' });
//   };

//   render() {
//     return (
//       <header className={s.searchbar}>
//         <form onSubmit={this.handleSubmit} className={s.form}>
//           <button type="submit" className={s.button} aria-label="search button">
//             <BsSearch size={20} />
//           </button>

//           <input
//             type="text"
//             autoComplete="off"
//             value={this.state.imgName}
//             onChange={this.handleNameChange}
//             autoFocus
//             name="imgName"
//             placeholder="Search images and photos"
//             className={s.input}
//           />
//         </form>
//       </header>
//     );
//   }
// }
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
