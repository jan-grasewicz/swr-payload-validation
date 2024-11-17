import * as Yup from "yup";
import { Middleware, SWRHook } from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function validatePayload(schema: Yup.AnySchema): Middleware {
  return (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const validationFetcher = async (url: string) => {
      if (!fetcher) throw new Error("missing fetcher fn");

      try {
        let data = await schema.validate(await fetcher(url));

        return data;
      } catch (error) {
        console.log("Payload validation error", error);
        throw error;
      }
    };

    return useSWRNext(key, validationFetcher, config);
  };
}
