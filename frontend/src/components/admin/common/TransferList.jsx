import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ListPaper = styled(Paper)(({ theme }) => {
  return {
    padding: "16px",
  };
});

function TransferList({ listLeft, listRight, renderList }) {
  return (
    <div className="flex items-center gap-4">
      <ListPaper variant="outlined">{renderList(listLeft)}</ListPaper>
      <div className="flex flex-col gap-2">
        <Button
          variant="outlined"
          size="small"
          //   onClick={handleAllRight}
          //   disabled={left.length === 0}
        >
          ≫
        </Button>
        <Button
          variant="outlined"
          size="small"
          //   onClick={handleCheckedRight}
          //   disabled={leftChecked.length === 0}
        >
          &gt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          //   onClick={handleCheckedLeft}
          //   disabled={rightChecked.length === 0}
        >
          &lt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          //   onClick={handleAllLeft}
          //   disabled={right.length === 0}
        >
          ≪
        </Button>
      </div>
      <ListPaper variant="outlined">{renderList(listRight)}</ListPaper>
    </div>
  );
}

export default TransferList;
