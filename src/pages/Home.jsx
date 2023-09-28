import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../helpers/flow";

export default function Home({}) {
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
      {[
        ...Array(10).fill({
          desc: "Achat etc ...",
          amount: 100,
          cur: "USD",
          date: new Date().toISOString(),
        }),
      ].map((it, i) => (
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 flex gap-2"
            >
              {it.amount}{" "}
              <Typography className="text-xs text-green-600 font-bold ">
                {it.cur}
              </Typography>
            </Typography>
            <Typography>
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to &quot;Naviglio&quot; where you can enjoy the main
              night life in Barcelona.
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 flex gap-4 justify-end">
            <Button onClick={(e) => onEditItem(it)}>MODIFIER</Button>
            <Button onClick={(e) => onDelItem(it)} color="red">
              SUPPRIMER
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
