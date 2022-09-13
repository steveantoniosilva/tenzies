export default function Die(props) {
  const styles = {
    backgroundColor: props.hold ? '#59e391' : '',
  };
  return (
    <div style={styles} className='die' onClick={props.freeze}>
      {props.value}
    </div>
  );
}
