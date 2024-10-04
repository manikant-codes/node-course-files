import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const ListPaper = styled(Paper)(() => {
  return {
    padding: "16px",
  };
});

function MyTransferList({
  listLeft,
  listRight,
  setListLeft,
  setListRight,
  renderList,
}) {
  const [listCheckedLeft, setListCheckedLeft] = useState([]);
  const [listCheckedRight, setListCheckedRight] = useState([]);

  console.log("listLeft", listLeft);
  console.log("listRight", listRight);
  console.log("listCheckedLeft", listCheckedLeft);
  console.log("listCheckedRight", listCheckedRight);

  function handleCheckedLeft(e, value) {
    if (e.target.checked) {
      setListCheckedLeft([...listCheckedLeft, value]);
    } else {
      const temp = listCheckedLeft.filter((item) => {
        if (item.value !== value.value) {
          return true;
        }
        return false;
      });
      setListCheckedLeft(temp);
    }
  }

  function handleCheckedRight(e, value) {
    if (e.target.checked) {
      setListCheckedRight([...listCheckedRight, value]);
    } else {
      const temp = listCheckedRight.filter((item) => {
        if (item.value !== value.value) {
          return true;
        }
        return false;
      });
      setListCheckedRight(temp);
    }
  }

  function shiftLeft() {
    setListLeft(listCheckedRight, setListCheckedLeft);
    setListCheckedRight([]);
  }

  function shiftRight() {
    setListRight(listCheckedLeft, setListCheckedRight);
    setListCheckedLeft([]);
  }

  function shiftLeftAll() {}
  function shiftRightAll() {}

  return (
    <div className="flex items-center gap-4">
      <ListPaper variant="outlined" className="min-h-[200px]">
        {renderList(listLeft, handleCheckedLeft)}
      </ListPaper>
      <div className="flex flex-col gap-2">
        <Button
          variant="outlined"
          size="small"
          onClick={shiftRightAll}
          disabled={listCheckedLeft.length === 0}
        >
          ≫
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={shiftRight}
          disabled={listCheckedLeft.length === 0}
        >
          &gt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={shiftLeft}
          disabled={listCheckedRight.length === 0}
        >
          &lt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={shiftLeftAll}
          disabled={listCheckedRight.length === 0}
        >
          ≪
        </Button>
      </div>
      <ListPaper variant="outlined" className="min-h-[200px]">
        {renderList(listRight, handleCheckedRight)}
      </ListPaper>
    </div>
  );
}

export default MyTransferList;
