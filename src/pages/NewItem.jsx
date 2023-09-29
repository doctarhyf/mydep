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
import DOBInput from "../comps/DOBInput";
import { AddNewItemToTable, TABLE_NAME, UpdateItem } from "../db/sb";

const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

export default function NewItem({}) {
  const [dateisvalid, setdateisvalid] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [editing, setediting] = useState(
    location.search.includes("edit") && location.state.item
  );
  const [data, setdata] = useState({
    label: "Achat etc ...",
    amount: 0,
    cur: "CDF",
    paid: false,
    due_at: "",
    paid_at: "",
  });

  useState(() => {
    const item = location.state?.item;
    if (item) setdata(item);
  }, []);

  function onAnnuler(e) {
    navigate(ROUTES.HOME.path);
  }

  function onChangeData(e) {
    let n = e.target.name;
    let v = e.target.value;

    if (n === "cur") {
      n = e.target.dataset.cur;
      v = e.target.checked;

      if (v) {
        setdata((old) => {
          let newdata = { ...old, cur: n };

          return newdata;
        });
      }

      return;
    }

    setdateisvalid(regex.test(v));

    setdata((old) => ({ ...old, [n]: v }));
  }

  function onSaveDep() {
    if (editing) {
      const id = data.id;
    } else {
      AddNewItemToTable(
        data,
        TABLE_NAME.MY_DEPS,
        (res) => {
          alert("Item added!");
          console.log("Item added!\n", res);
          navigate(ROUTES.HOME.path);
        },
        (e) => {
          alert("Error (" + e.code + ")\n" + e.message);
          console.log("Erreur adding item.\n", e);
        }
      );
    }
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
        name="label"
        variant="outlined"
        label={editing ? "Editing" : "New Item"}
        value={data.label || ""}
        onChange={onChangeData}
      />

      <Input
        name="amount"
        label="Amount"
        type="number"
        value={data.amount || ""}
        onChange={onChangeData}
      />
      <div className="flex gap-10">
        <Radio
          onChange={onChangeData}
          data-cur="USD"
          name="cur"
          label="USD"
          checked={data.cur === "USD"}
        />
        <Radio
          onChange={onChangeData}
          data-cur="CDF"
          name="cur"
          label="CDF"
          checked={data.cur === "CDF"}
          defaultChecked
        />
      </div>

      <div className="w-[22rem]">
        <Input
          name="due_at"
          label="Due Date"
          value={data.due_at || ""}
          maxLength={10}
          onChange={onChangeData}
        />
        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center gap-1 font-normal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-mt-px h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex flex-col">
            <div>For example : 25/12/2023</div>
          </div>
        </Typography>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={(e) => onSaveDep()}
          className={`  ${
            dateisvalid && data.label !== "" && data.amount !== 0
              ? "visible"
              : "collapse"
          } `}
          color="teal"
        >
          {editing ? "UPDATE" : "INSERT"}
        </Button>
        <Button onClick={onAnnuler} color="red">
          ANNULER
        </Button>

        {editing && <Button color="red">SUPPRIMER</Button>}
      </div>

      <div
        className={` px-1 rounded-md text-white w-fit ${
          dateisvalid ? "bg-green-500" : "bg-red-500"
        } `}
      >
        {dateisvalid
          ? "Formulaire valide"
          : "Veuillez correctement remplir tous les champs"}{" "}
      </div>

      <>{JSON.stringify(data)}</>
    </div>
  );
}
