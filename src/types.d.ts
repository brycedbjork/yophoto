declare module "pi-gpio" {
  export default {
    open: (
      pin: number,
      type: "input" | "output",
      callback: (err: any) => void
    ) => {},
    close: (pin: number) => {},
    read: (pin: number, callback: (err: any, value: any) => void) => {}
  };
}
