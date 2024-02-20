import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = (args: LoaderFunctionArgs) => {
  console.log(args.context.env); // this is undefined
  console.log(args.context.cloudflare.env); // this is defined
  return {
    "context-env": args.context.env,
    "context-cloudflare-env": args.context.cloudflare.env,
  };
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>The value of args.context.env is {String(data["context-env"])}</li>
        <li>
          The value of args.context.cloudflare.env is{" "}
          {JSON.stringify(data["context-cloudflare-env"])}
        </li>
      </ul>
    </div>
  );
}
