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
import { useEffect, useState } from "react";
import { loadAllMyDep } from "../db/db";
import sad from "../assets/sad.png";
import load from "../assets/load.svg";

export default function Home({}) {
  const [items, setitems] = useState([]);
  const [itemsfiltered, setitemsfiltered] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setloading(true);
    setitems([]);
    setitemsfiltered([]);

    loadAllMyDep(
      (d) => {
        setitems(d);
        setloading(false);
      },
      (e) => {
        setloading(false);
        console.log(e);
        alert("Error loading data (" + e.code + ").\n" + e.message);
      }
    );
  }

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
            <td colSpan={6} align="center">
              {loading && <img src={load} width={30} />}
            </td>
          </tr>
          <tr>
            <td colSpan={6}>
              <Input label="Search" icon={<i className="fas fa-heart" />} />
            </td>
          </tr>
          <tr>
            <td>No</td>
            <td>DESC.</td>
            <td>AMT.</td>
            <td className={` hidden sm:block `}>DUE</td>
            <td>DAYS R.</td>
            <td>PYD</td>
          </tr>

          <tr className="font-bold ">
            <td className="p-2 bg-blue-gray-100/50 w-2">TOTAL</td>
            <td className="p-2 bg-blue-gray-100/50" colSpan={6}>
              0
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
                <div>{it.label}</div>
                <div className="text-xs text-black/50">{it.created_at}</div>
              </td>
              <td>
                {it.amount} {it.cur}
              </td>

              <td valign="center" className={` hidden sm:block `}>
                {it.due_at && it.due_at}
              </td>
              <td>3days</td>
              <td>
                <Checkbox checked={it.paid} />
              </td>
            </tr>
          ))}

          {items.length === 0 && !loading && (
            <tr>
              <td
                align="center"
                valign="center"
                className="p-8 text-center"
                colSpan={6}
              >
                <img className="mx-auto" src={sad} width={60} />
                <p>No Items yet</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
