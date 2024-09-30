import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const ListPaper = styled(Paper)(({ theme }) => {
  return {
    padding: "16px",
  };
});

function TransferList({
  listLeft,
  setListLeft,
  listRight,
  setListRight,
  renderList,
}) {
  const [listCheckedLeft, setListCheckedLeft] = useState([]);
  const [listCheckedRight, setListCheckedRight] = useState([]);

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
  }
  function shiftRight() {
    setListRight(listCheckedLeft, setListCheckedRight);
  }

  function shiftLeftAll() {}
  function shiftRightAll() {}
  return (
    <div className="flex items-center gap-4">
      <ListPaper variant="outlined">
        {renderList(listLeft, handleCheckedLeft)}
      </ListPaper>
      <div className="flex flex-col gap-2">
        <Button
          variant="outlined"
          size="small"
          onClick={shiftRightAll}
          //   disabled={left.length === 0}
        >
          ≫
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={shiftRight}
          //   disabled={leftChecked.length === 0}
        >
          &gt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={shiftLeft}
          //   disabled={rightChecked.length === 0}
        >
          &lt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={shiftLeftAll}
          //   disabled={right.length === 0}
        >
          ≪
        </Button>
      </div>
      <ListPaper variant="outlined">
        {renderList(listRight, handleCheckedRight)}
      </ListPaper>
    </div>
  );
}

export default TransferList;
