// utils/index.d.ts
declare module "@/utils/index.js" {
  export function loadScripts(
    scriptLocations: string[],
    callback: () => void
  ): void;
  export function testJS(): boolean;
}
