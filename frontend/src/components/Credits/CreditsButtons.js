import Button from "../Login/Buttons/Button";

function CreditsButtons() {
  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        gap: "15px",
      }}
    >
      <Button text={"Purchase"} />
      {/* <Button text={"Cancel Purchase"} /> */}
    </div>
  );
}

export default CreditsButtons;
