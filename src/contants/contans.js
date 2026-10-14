import { format } from 'date-fns';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';

export const handleTimeFormat = (data) => {
  if (!data) return "";

  const clean = data.replace("Z", "");

  const date = new Date(clean);

  const formatted = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return formatted
    .replace(",", "")
    .replace(/\s?(\d+):00/, " $1")
    .replace(" AM", "AM")
    .replace(" PM", "PM");
};