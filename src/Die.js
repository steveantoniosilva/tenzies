export default function Die(props) {
  const styles = {
    backgroundColor: props.hold ? '#5D6D7E' : '',
    color: props.hold ? 'white' : '#111',
  };
  return (
    <div style={styles} className='die' onClick={props.freeze}>
      {props.value}
    </div>
  );
}
