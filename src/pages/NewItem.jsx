import {
  Button,
  Input,
  Radio,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BellIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { ROUTES } from "../helpers/flow";

export default function NewItem({}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [editing, setediting] = useState(
    location.search.includes("edit") && location.state.item
  );
  const [data, setdata] = useState({});

  useState(() => {
    const item = location.state?.item;
    if (item) setdata(item);
  }, []);

  function onAnnuler(e) {
    navigate(ROUTES.HOME.path);
  }

  return (
    <div className="flex w-96 flex-col gap-6 p-4">
      <div className="flex">
        <Typography variant="h1">{data.amount || ""}</Typography>
        <Typography variant="h5" color="green">
          {data.cur || ""}
        </Typography>
      </div>
      <Textarea
        variant="outlined"
        label={editing ? "Editing" : "New Item"}
        value={data.desc || ""}
      />

      <Input label="Amount" value={data.amount || ""} />
      <div className="flex gap-10">
        <Radio name="type" label="USD" />
        <Radio name="type" label="CDF" defaultChecked />
      </div>
      <Input label="Due Date" value={data.due_at || ""} />

      <div className="flex justify-between">
        <Button color="teal">{editing ? "UPDATE" : "INSERT"}</Button>
        <Button onClick={onAnnuler} color="red">
          ANNULER
        </Button>

        {editing && <Button color="red">SUPPRIMER</Button>}
      </div>
    </div>
  );
}
