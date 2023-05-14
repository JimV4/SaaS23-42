import Button from "../Login/Buttons/Button";

function CreditsButtons(props) {
  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        gap: "15px",
      }}
    >
      {props.selectedAmount && (
        <Button text={"Purchase"} onClick={props.onShowModal} />
      )}
      {/* {props.selected && <Button text={"Cancel"} />} */}
    </div>
  );
}

export default CreditsButtons;
