import useSWR from "swr";
import * as Yup from "yup";
import { fetcher, validatePayload } from "./utils";

const catFactSchema = Yup.object({
  fact: Yup.string().required(),
  length: Yup.number().required(),
  //   test: Yup.string().required(),
});

type PayloadType = Yup.InferType<typeof catFactSchema>;

export function useCatFact() {
  const swrResponse = useSWR<PayloadType>(
    "https://catfact.ninja/fact",
    fetcher,
    { use: [validatePayload(catFactSchema)] }
  );

  return swrResponse;
}
