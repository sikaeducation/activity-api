/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "vitest-cucumber-plugin" {
  import PluginOption from "vite";
  export default function (): PluginOption;
  export function Given(state?: any, params?: any, data?: any): any;
  export function When(state?: any, params?: any, data?: any): any;
  export function Then(state?: any, params?: any, data?: any): any;
  export function DataTable(data: any): any;
}
