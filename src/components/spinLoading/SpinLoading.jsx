import RingLoader from "react-spinners/RingLoader";
const Loading = () => {
    const style = {position:'fixed' , top: "50%" , left : '50%', color :'blue' , transform : "translate(-50% , -50%)"}
  return (
    <div>
        <RingLoader style={style}  />
    </div>
  )
}

export default Loading