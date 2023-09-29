import { GetAllItemsFromTable, TABLE_NAME } from "./sb";

export const DUMMY_MY_DEPS = [
  ...Array(10).fill({
    label: "Achat etc ...",
    amount: 100,
    cur: "USD",
    paid: true,
    created_at: new Date().toISOString(),
    due_at: new Date().toISOString(),
    paid_at: new Date().toISOString(),
  }),
];

export async function loadAllMyDep(onSuccess, onError) {
  const mydeps = await GetAllItemsFromTable(TABLE_NAME.MY_DEPS);

  if (Array.isArray(mydeps)) {
    if (onSuccess) onSuccess(mydeps);
  } else {
    if (onError) onError(mydeps);
  }
}
