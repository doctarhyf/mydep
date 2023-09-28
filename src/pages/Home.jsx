import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../helpers/flow";
import { useState } from "react";

export default function Home({}) {
  const [items, setitems] = useState([
    ...Array(10).fill({
      desc: "Achat etc ...",
      amount: 100,
      cur: "USD",
      paid: true,
      created_at: new Date().toISOString(),
      due_at: new Date().toISOString(),
      paid_at: new Date().toISOString(),
    }),
  ]);
  const navigate = useNavigate();

  function onEditItem(it) {
    navigate(ROUTES.NEW_ITEM.path + "?edit", { state: { item: it } });
    console.log(it);
  }

  function onDelItem(it) {
    console.log(it);
  }

  return (
    <div className="flex flex-col p-2">
      <table className="text-sm">
        <thead>
          <tr>
            <td>No</td>
            <td>DESC.</td>
            <td>AMT.</td>
            <td className={` hidden sm:block `}>DUE</td>
            <td>DAYS R.</td>
            <td>PYD</td>
          </tr>
          <tr>
            <td colSpan={items.length - 1}>
              <Input label="Search" icon={<i className="fas fa-heart" />} />
            </td>
          </tr>
          <tr className="font-bold ">
            <td className="p-2 bg-blue-gray-100/50">TOTAL</td>
            <td className="p-2 bg-blue-gray-100/50" colSpan={items.length - 2}>
              500USD
            </td>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr
              key={i}
              onClick={(e) => {
                if (e.target.checked === undefined) {
                  onEditItem(it);
                }
              }}
              className="hover:bg-teal-100 cursor-pointer hover:text-teal-900"
            >
              <td>{i + 1}</td>
              <td>
                <div>{it.desc}</div>
                <div className="text-xs text-black/50">{it.created_at}</div>
              </td>
              <td>
                {it.amount} {it.cur}
              </td>

              <td className={` hidden sm:block `}>
                {it.paid_at && it.paid_at}
              </td>
              <td>3days</td>
              <td>
                <Checkbox checked={it.paid} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
