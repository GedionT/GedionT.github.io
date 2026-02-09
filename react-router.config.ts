import type { Config } from "@react-router/dev/config";

export default {
    ssr: false,           // no server runtime
    prerender: ["/", "/about", "/projects", "/blogs", "/contact"],
} satisfies Config;
