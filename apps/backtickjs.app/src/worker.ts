// The Worker's entry: the app in index.ts, and the gateway its releases reach
// the internet through. A file of its own because Node can't load
// cloudflare:workers, and the tests load index.ts.
import { WorkerEntrypoint } from "cloudflare:workers";

export { default } from "./index.ts";

// Every fetch() a release makes comes through here. Host only: a URL's path
// and query can hold the app's API keys.
export class OutboundGateway extends WorkerEntrypoint<
  Cloudflare.Env,
  { app: string }
> {
  fetch(request: Request): Promise<Response> {
    const { host } = new URL(request.url);
    console.log(`${this.ctx.props.app} ${request.method} ${host}`);
    return fetch(request);
  }
}

declare global {
  namespace Cloudflare {
    interface GlobalProps {
      mainModule: typeof import("./worker.ts");
    }
  }
}
