
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
    input:"src/index.ts",
    output:{
        dir:"dist",
        format:"es",
        name:"reactjs-toaster"
    },
    external:["react","react-dom"],
    plugins:[typescript({tsconfig:"tsconfig.json"})]
})