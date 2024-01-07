function Cat (props) {
  let {item} = props


  return (
    <div>
    Hello, my name is <b>{item.name}</b>. I am a <b>{item.type}</b> and weigh <b>{item.mass}</b>
    </div>
  )
}

export default Cat
