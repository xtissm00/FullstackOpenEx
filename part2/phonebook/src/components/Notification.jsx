const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return <div style={notificationStyle}>{
      message}
    </div>;
};

export default Notification;