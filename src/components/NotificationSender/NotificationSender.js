import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import './NotificationSender.css'
import NavBar from '../NavBar/NavBar';
import Select from 'react-select';
import MultiSelector from '../MultiSelector/MultiSelector';
import Uploader from '../Uploader/Uploader';

const options = [
  { value: 'now', label: 'Now' },
  { value: '1-day-later', label: '1 Day Later' },
  { value: '2-days-later', label: '2 Days Later' }
];

const scheduleStyles = {
  control: styles => ({ 
    ...styles, 
    backgroundColor: 'white', 
    width: '100.5%', 
    marginTop: 20, 
    marginBottom: 40,
    fontSize: 16,
    paddingTop: 7, 
    paddingBottom: 7
  }),
}

Modal.setAppElement('#root');

class NotificationSender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSelect = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const { selectedOption } = this.state;

    return(
      <Fragment>
        <div className='container'>
          <NavBar />
          <div className='body'>
            <h4 className='label' id='send-to-text'>Send To: </h4>
            <MultiSelector />
            <textarea id='notification-content' placeholder='Type notification here...' rows="13"/>
            <input id='link-url' placeholder='Link URL' />

            <div className='attachment'>
              <h4 className='label'>Attachments: </h4>
              <button 
                id='upload-button' 
                onClick={this.openModal}
              >
                  Upload Files
              </button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
                className="Modal"
              >

                <Uploader closeModal={this.closeModal}/>
              </Modal>
            </div>
            
            
            <Select
              id='schedule-notification'
              value={selectedOption}
              isSearchable={false}
              onChange={this.handleSelect}
              options={options}
              placeholder='Schedule message...'
              styles={scheduleStyles}
            />

            <button>Send</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NotificationSender;