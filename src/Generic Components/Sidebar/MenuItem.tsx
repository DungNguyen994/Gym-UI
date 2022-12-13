import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface Props {
  Icon: React.ElementType;
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  selected: boolean;
}

export const MenuItem: React.FC<Props> = ({
  Icon,
  text,
  onClick,
  selected,
}) => {
  return (
    <ListItem className={`menu-item-container ${selected ? "selected" : ""}`}>
      <ListItemButton onClick={onClick} style={{ background: "transparent" }}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};
