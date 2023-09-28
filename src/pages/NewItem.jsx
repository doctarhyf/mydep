import { Textarea } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

export default function NewItem({}) {
  const location = useLocation();

  return (
    <div className="flex w-96 flex-col gap-6">
      <Textarea variant="outlined" label="Outlined" />
    </div>
  );
}
