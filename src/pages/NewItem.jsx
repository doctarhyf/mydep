import { Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  HomeIcon,
  BellIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export default function NewItem({}) {
  const location = useLocation();
  const [editing, setediting] = useState(
    location.search.includes("edit") && location.state.item
  );

  console.log(location);

  return (
    <div className="flex w-96 flex-col gap-6 p-4">
      <Textarea variant="outlined" label={editing ? "Editing" : "New Item"} />
      <Input label="Amount" />
      <Input label="Due Date" />
    </div>
  );
}
